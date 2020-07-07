// var todoList = function () {
// DOM Variable Declarations
var itemInput = document.querySelector('.todo-input-section input');
var itemContainer = document.querySelector('.item-container');
var addButton = document.querySelector('#btn-add');
var deleteButton = document.querySelectorAll('.btn-delete');

var httpRequest = new XMLHttpRequest();

// Event Handler for Request Load - get tasks from the ATDAPI and render them in the DOM
httpRequest.onload = function () {
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
        var itemHTML = '<div class="item">' +
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

// Event Handler for Click Button - add new item to list if input field is populated

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

addItem();

// }

// todoList();