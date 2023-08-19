// * call all classes and ids from content
let FName = document.getElementById("First");
let LName = document.getElementById("Last");
let Email = document.getElementById("Email");
let Search = document.getElementById("search");
let Submit = document.getElementById("btn");
let del = document.getElementById("delete");
let edit = document.getElementById("edit");
let table = document.getElementById("table");
// ! Get elements from local storage;
function getItemsfromLS() {
  let test = JSON.parse(localStorage.getItem("LocalINFO"));
  // if (test == null) {
  //   tasks = [];
  // } else {
  //   tasks = test;
  // }
  ArrOfCols = test ?? [];
}

getItemsfromLS();

// ! mode of submit btn
let mode = "create";
let FakeI;

// let ArrOfCols = [];

function ShowData() {
  table.innerHTML = "";
  table.innerHTML = ` <tr>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Email</th>
  <th>Actions</th>
</tr>`;
  let index = 0;
  for (col of ArrOfCols) {
    let newRow = `  <tr>
    <td>${col.FirstName}</td>
    <td>${col.LastName}</td>
    <td>${col.Email}</td>
    <td class="btncont">
      <button id="edit" onclick=EditElement(${index})>Edit</button>
      <button id="delete" onclick=DeleteElement(${index}) >Delete</button>
    </td>
  </tr>`;
    index++;
    table.innerHTML += newRow;
  }
}
ShowData();

// ! Add a New Item To the table
Submit.addEventListener("click", () => {
  if (
    FName.value == "" ||
    LName.value == "" ||
    Email.value == "" ||
    !Email.value.includes("@gmail.com")
  ) {
    alert("Please fill in the required fields");
  } else {
    let NewItem = {
      FirstName: FName.value,
      LastName: LName.value,
      Email: Email.value,
    };
    if (mode == "create") {
      ArrOfCols.push(NewItem);
      editLS();
      ShowData();
    } else if (mode == "Update") {
      ArrOfCols[FakeI] = NewItem;
      editLS();
      ShowData();
      Submit.innerHTML = "create";
      mode = "create";
    }
  }

  FName.value = "";
  LName.value = "";
  Email.value = "";
});
// ! delete an element from the table

function DeleteElement(index) {
  ArrOfCols.splice(index, 1);
  editLS();
  ShowData();
}

// * Editing Elements In The Table

function EditElement(index) {
  FName.value = ArrOfCols[index].FirstName;
  LName.value = ArrOfCols[index].LastName;
  Email.value = ArrOfCols[index].Email;
  mode = "Update";
  Submit.innerHTML = "Update";
  FakeI = index;
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Use "auto" for instant scrolling
  });
}

// ! local storage
// *================ Local Storage Functions ===============
function editLS() {
  localStorage.setItem("LocalINFO", JSON.stringify(ArrOfCols));
}

// ?=================== Search in JS ====================

function Find(valeur) {
  table.innerHTML = "";
  table.innerHTML = ` <tr>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Actions</th>
  </tr>`;

  let index = 0; // Initialize the index here

  for (el of ArrOfCols) {
    if (el.FirstName.toLowerCase().includes(Search.value.toLowerCase())) {
      let SearchRow = `  <tr>
        <td>${el.FirstName}</td>
        <td>${el.LastName}</td>
        <td>${el.Email}</td>
        <td class="btncont">
          <button id="edit" onclick=EditElement(${index})>Edit</button>
          <button id="delete" onclick=DeleteElement(${index})>Delete</button>
        </td>
      </tr>`;
      table.innerHTML += SearchRow;
    }
    index++; // Increment the index
  }
}
