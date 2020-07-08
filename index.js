var todoList = function () {
  // DOM Variable Declarations
  var itemContainer = document.querySelector(".item-container");

  // Event Handler for Request Load - get tasks from the ATDAPI and render them in the DOM
  var populateList = function () {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // Upon successful request, parse data into JS object for processing
        if (httpRequest.status === 200) {
          var items = JSON.parse(httpRequest.responseText)["tasks"];
          itemContainer.innerHTML = "";
          items.forEach(function (item) {
            // Create individual row for each item in the DOM
            var status;
            if (item.completed === true) {
              status = "checked";
            }

            var itemHTML =
              '<div class="item" data-attribute="' +
              item.id +
              '" > ' +
              "<div>" +
              '<input type="checkbox" class="checkbox"' +
              status +
              ">" +
              '<span class="item-text ' +
              status +
              '">' +
              item.content +
              "</span>" +
              "</div>" +
              '<button class="btn-delete"><i class="fa fa-trash fa-2x"></i></button>' +
              "</div>";

            itemContainer.innerHTML += itemHTML;
          });
        } else {
          console.log(httpRequest.statusText);
        }
      }
    };
    httpRequest.onerror = function () {
      console.log(httpRequest.statusText);
    };
    httpRequest.open(
      "GET",
      "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=170"
    );
    httpRequest.send();
  };
  populateList();

  window.addEventListener("load", function () {
    var addButton = document.querySelector("#btn-add");
    var completeButtons = Array.from(
      document.querySelectorAll("input.checkbox")
    );
    var deleteButtons = Array.from(document.querySelectorAll(".btn-delete"));

    // Function for marking task complete
    var markComplete = function (e) {
      // Retrieve the DOM elements corresponding API id
      var itemID = this.parentElement.parentElement.getAttribute(
        "data-attribute"
      );
      console.log(itemID);
      console.log(e.target.checked);
      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            populateList();
          } else {
            console.log(httpRequest.statusText);
          }
        }
      };
      // Generate request that will toggle the completed and active status to opposite of current state
      if (e.target.checked === true) {
        httpRequest.open(
          "PUT",
          "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
          itemID +
          "/mark_complete?api_key=170"
        );
        console.log("marked complete");
      } else {
        // Otherwise, the task is not checked, check it and generate a mark complete request
        httpRequest.open(
          "PUT",
          "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
          itemID +
          "/mark_active?api_key=170"
        );
        console.log("marked active");
      }

      httpRequest.send();
      httpRequest.onerror = function () {
        console.log(httpRequest.statusText);
      };
    };

    // addItem Function -
    var addItem = function () {
      var itemInput = document.querySelector(".todo-input-section input");
      console.log(itemInput.value);
      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            populateList();
          } else {
            console.log(httpRequest.statusText);
          }
        }
      };

      httpRequest.open(
        "POST",
        "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=170"
      );
      httpRequest.setRequestHeader("Content-Type", "application/json");

      httpRequest.send(
        JSON.stringify({
          task: {
            content: itemInput.value,
          },
        })
      );
      httpRequest.onerror = function () {
        console.log(httpRequest.statusText);
      };

      populateList();

      // Clear input value
      itemInput.value = "";
    };
    // removeItem Function - remove todo item
    var removeItem = function (e) {
      console.log("delete");

      // Retrieve the DOM elements corresponding API id
      var itemID = this.parentElement.getAttribute("data-attribute");
      console.log(itemID);

      var httpRequest = new XMLHttpRequest();
      httpRequest.onload = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            console.log(httpRequest.responseText);
            populateList();
          } else {
            console.log(httpRequest.statusText);
          }
        }
      };

      httpRequest.open(
        "DELETE",
        "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
        itemID +
        "?api_key=170"
      );

      httpRequest.send();
      httpRequest.onerror = function () {
        console.log(httpRequest.statusText);
      };
    };

    // Event Handler for Add Button - add new item to list if input field is populated
    addButton.addEventListener("click", function () {
      addItem();
      e.preventDefault()
    });

    // Event Listener for Complete Buttons
    completeButtons.forEach(function (button) {
      button.addEventListener("click", markComplete);
    });

    // Event Listener for Delete Buttons
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", removeItem);
    });
  });
};

todoList();