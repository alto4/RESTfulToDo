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
httpRequest.onerror = function () {
  console.log(httpRequest.statusText);
}

httpRequest.open('GET', 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=169');

httpRequest.setRequestHeader("Content-Type", "application/json");
httpRequest.send(JSON.stringify({
  task: {
    content: "Code"
  }
}));