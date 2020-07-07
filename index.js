var todoList = function () {
  // DOM Variable Declarations
  var itemInput = document.querySelector('.todo-input-section input');
  var itemContainer = document.querySelector('.item-container');

  var httpRequest = new XMLHttpRequest();


  // Event Handler for Request Load - get tasks from the ATDAPI and render them in the DOM
  httpRequest.onload = function populateList() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      // Upon successful request, parse data into JS object for processing 
      if (httpRequest.status === 200) {
        var items = JSON.parse(httpRequest.responseText)["tasks"];
        items.forEach(function (item) {
          // Create individual row for each item in the DOM
          /*console.log(item.id);
          console.log(item.content);
          console.log(item.completed);
          */
          var itemHTML = '<div class="item" data-attribute="' + item.id + '" > ' +
            '<div>' +
            '<input type="checkbox" class="checkbox">' +
            '<span class="item-text">' + item.content + '</span>' +
            '</div>' +
            '<button class="btn-delete"><i class="fa fa-trash fa-2x"></i></button>' +
            '</div>'

          itemContainer.innerHTML += itemHTML;
        })
      } else {
        console.log(httpRequest.statusText);
      }
    }
  }

  httpRequest.open('GET', 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=169');
  httpRequest.send();


  httpRequest.onerror = function () {
    console.log(httpRequest.statusText);
  }

  // addItem Function - 
  var addItem = function () {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          console.log(httpRequest.responseText);
        } else {
          console.log(httpRequest.statusText);
        }
      }
    }

    httpRequest.open('POST', 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=169');
    httpRequest.setRequestHeader('Content-Type', 'application/json');

    httpRequest.send(JSON.stringify({
      task: {
        content: "Groceries"
      }
    }))
    httpRequest.onerror = function () {
      console.log(httpRequest.statusText);
    }
  }

  window.addEventListener('load', function () {
    var addButton = document.querySelector('#btn-add');
    var completeButtons = Array.from(document.querySelectorAll('input.checkbox'));
    var deleteButtons = document.querySelectorAll('.btn-delete');

    // Function for marking task complete
    var markComplete = function (e) {
      // Retrieve the DOM elements corresponding API id
      var itemID = this.parentElement.parentElement.getAttribute("data-attribute");
      console.log(itemID);
      console.log(e.target.checked);
      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
          } else {
            console.log(httpRequest.statusText);
          }
        }
      }
      // Generate request that will toggle the completed and active status to opposite of current state
      if (e.target.checked === true) {
        httpRequest.open('PUT', 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + itemID + '/mark_complete?api_key=169');
        console.log('marked complete');
      } else {
        // Otherwise, the task is not checked, check it and generate a mark complete request
        httpRequest.open('PUT', 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + itemID + '/mark_active?api_key=169');
        console.log('marked active');
      }

      httpRequest.send();
      httpRequest.onerror = function () {
        console.log(httpRequest.statusText);
      }
    }

    // removeItem Function - remove todo item
    var removeItem = function (e) {
      console.log('delete');

      // Retrieve the DOM elements corresponding API id
      var itemID = this.parentElement.getAttribute("data-attribute");
      console.log(itemID);

      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
          } else {
            console.log(httpRequest.statusText);
          }
        }
      }

      httpRequest.open('DELETE', 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + itemID + '?api_key=169');

      httpRequest.send();
      httpRequest.onerror = function () {
        console.log(httpRequest.statusText);
      }
      populateList();
    }

    // Event Handler for Add Button - add new item to list if input field is populated
    addButton.addEventListener('click', function () {
      addItem();
      populateList();
    });

    // Event Listener for Complete Buttons
    completeButtons.forEach(function (button) {
      button.addEventListener('click', markComplete);
    });

    // Event Listener for Delete Buttons
    deleteButtons.forEach(function (button) {
      button.addEventListener('click', removeItem);
    });
  })
}

todoList();