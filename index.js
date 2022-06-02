console.log("this is index.js");

//constructor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

//Display constructor
function Display() {}

//Add methods to display prototype
Display.prototype.add = function (book) {
  console.log("Adding to ui");
  tableBody = document.getElementById("tableBody");
  let uiString = ` <tr>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr> `;
  tableBody.innerHTML += uiString;
};

Display.prototype.clear = function () {
  libraryform.reset();
};

Display.prototype.validate = function (book) {
  if (book.name.length < 2 || book.author.length < 2) {
    return false;
  } else {
    return true;
  }
};

Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>message:</strong> ${displayMessage}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  setTimeout(() => {
    message.innerHTML = " ";
  }, 2000);
};

//Add submit event listener to libraryform
let libraryform = document.getElementById("libraryform");
libraryform.addEventListener("submit", libraryformSubmit);

function libraryformSubmit(e) {
  console.log("You have submitted the form");
  let name = document.getElementById("bookname").value;
  let author = document.getElementById("author").value;
  let type;
  let Fiction = document.getElementById("Fiction");
  let Programming = document.getElementById("Programming");
  let Cooking = document.getElementById("Cooking");

  if (Fiction.checked) {
    type = Fiction.value;
  } else if (Programming.checked) {
    type = Programming.value;
  } else if (Cooking.checked) {
    type = Cooking.value;
  }

  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("succcess", "Your book has been successfully added");
  } else {
    display.show("danger", "sorry you cannot add this book.");
  }

  e.preventDefault();
}
