// declare variables
let container = document.querySelector(".content");
let page = document.querySelector(".pages");
let editButton = document.querySelector(".profile__btn-edit");
let editFormOpen = document.querySelector(".edit");
let editFormClose = document.querySelector(".edit__close");
let submitButton = document.querySelector(".edit__submit");
let editUsername = document.querySelector(".edit__username");
let editJob = document.querySelector(".edit__job");
let userName = document.querySelector(".profile__username");
let job = document.querySelector(".profile__job");

// function handlers
function editProfile() {
  editUsername.value = userName.textContent;
  editJob.value = job.textContent;
}

function showEditForm() {
  editFormOpen.classList.add("edit_activate");
  page.classList.add("pages_dimmed");
  container.setAttribute("style", "overflow: hidden");

  editProfile();
}

function hideEditForm() {
  editFormOpen.classList.remove("edit_activate");
  page.classList.remove("pages_dimmed");
  container.removeAttribute("style", "overflow: hidden");
}

function submitForm() {
  let maxChars = 20;
  userName.textContent = editUsername.value.slice(0, maxChars);
  job.textContent = editJob.value.slice(0, maxChars);

  if (userName.length > maxChars || job.length > maxChars) {
    alert("Max chars exceeded");
    return;
  }

  hideEditForm();
}

function enterSubmit(event) {
  if (event.keyCode === 13) {
    submitForm();
  }
}

// event listeners
editButton.addEventListener("click", showEditForm);
editFormClose.addEventListener("click", hideEditForm);
submitButton.addEventListener("click", submitForm);
editFormOpen.addEventListener("keypress", enterSubmit);
