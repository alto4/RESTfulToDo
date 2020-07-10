var todoList = function () {
  // DOM Variable Declarations
  var itemContainer = document.querySelector(".item-container");

  // populateList Function - get tasks from the ATDAPI and render them in the DOM
  var populateList = function () {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onload = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        // Upon successful request, parse data into JS object for processing
        if (httpRequest.status === 200) {
          var items = JSON.parse(httpRequest.responseText)["tasks"];
          itemContainer.innerHTML = "";

          // Create individual row for each item in the DOM
          items.forEach(function (item) {
            // Check for complete/active status to display accurately in the DOM
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

            // Push the new item row into the DOM
            itemContainer.innerHTML += itemHTML;
            // Add event listeners to newly generated DOM elements once they are created
            var addButton = document.querySelector("#btn-add");
            var completeButtons = Array.from(
              document.querySelectorAll("input.checkbox")
            );
            var deleteButtons = Array.from(
              document.querySelectorAll(".btn-delete")
            );

            // CRUD FUNCTIONS
            // addItem Function - adds a new item to the list based on input field value
            var addItem = function () {
              var itemInput = document.querySelector(
                ".todo-input-section input"
              );
              var httpRequest = new XMLHttpRequest();

              httpRequest.onload = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                  if (httpRequest.status === 200) {
                    populateList();
                  } else {
                    console.log(httpRequest.statusText);
                  }
                }
              };

              // Post request to add new item
              httpRequest.open(
                "POST",
                "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=168"
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
            };

            // markComplete Function - toggles between an item being complete or active
            var markComplete = function (e) {
              // Retrieve the data-attribute that contains corresponding API id
              var itemID = this.parentElement.parentElement.getAttribute(
                "data-attribute"
              );
              var httpRequest = new XMLHttpRequest();

              httpRequest.onload = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                  if (httpRequest.status === 200) {
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
                    "/mark_complete?api_key=168"
                );
                console.log("marked complete");
              } else {
                // Otherwise, the task is not checked, check it and generate a mark complete request
                httpRequest.open(
                  "PUT",
                  "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
                    itemID +
                    "/mark_active?api_key=168"
                );
                console.log("marked active");
              }

              httpRequest.send();
              httpRequest.onerror = function () {
                console.log(httpRequest.statusText);
              };
            };

            // removeItem Function - remove todo item
            var removeItem = function (e) {
              // Retrieve the DOM elements corresponding API id
              var itemID = this.parentElement.getAttribute("data-attribute");
              var httpRequest = new XMLHttpRequest();

              httpRequest.onload = function () {
                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                  if (httpRequest.status === 200) {
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
                  "?api_key=168"
              );

              httpRequest.send();
              httpRequest.onerror = function () {
                console.log(httpRequest.statusText);
              };
            };

            // EVENT HANDLERS
            // Event Handler for Add Button - add new item to list if input field is populated
            addButton.addEventListener("click", function (e) {
              e.preventDefault();
              addItem();

              // Clear input value once new item has been added to the list
              document.querySelector(".todo-input-section input").value = "";
            });

            // Event Listener for Complete Buttons
            completeButtons.forEach(function (button) {
              button.addEventListener("click", markComplete);
            });

            // Event Listener for Delete Buttons
            deleteButtons.forEach(function (button) {
              button.addEventListener("click", removeItem);
            });
            console.log(document.querySelectorAll(".btn-delete"));
          });
          // If the request fails, log the error message
        } else {
          console.log(httpRequest.statusText);
        }
      }
    };

    httpRequest.onerror = function () {
      console.log(httpRequest.statusText);
    };
    // GET request to retrieve all items in task list
    httpRequest.open(
      "GET",
      "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=168"
    );
    httpRequest.send();
  };

  populateList();
};

// Run to-do list
todoList();
