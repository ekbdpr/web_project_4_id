// initial cards
const initialCards = [
  {
    name: "Lembah Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Danau Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Pegunungan Gundul",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Gunung Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Taman Nasional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// define global variables for popUp
const mainBody = document.querySelector(".content");
const page = document.querySelector(".pages");
const editProfileBtn = document.querySelector(".profile__btn-edit");

// add event listeners
editProfileBtn.addEventListener("click", () => {
  showPopUp("#editProfileTemp", ".edit", ".edit__close");
});

// show popUp window handler
function showPopUp(element, elementClass, closeElement) {
  const templateId = document.querySelector(element).content;
  const templateNode = templateId.querySelector(elementClass).cloneNode(true);

  mainBody.append(templateNode);
  profileData(templateNode);

  setTimeout(() => {
    templateNode.classList.add("popUp");
    page.classList.add("pages_dimmed");
    mainBody.setAttribute("style", "overflow: hidden");
  }, 5);

  const removeElement = document.querySelector(closeElement);

  removeElement.addEventListener("click", () => {
    removePopUp(templateNode);
  });
}

// remove popUp window
function removePopUp(templateNode) {
  templateNode.style.opacity = 0;
  setTimeout(() => {
    templateNode.remove();
    page.classList.remove("pages_dimmed");
    mainBody.removeAttribute("style");
  }, 300);
}

// function to copy text content to value
function profileData(templateNode) {
  const userName = document.querySelector(".profile__username");
  const userJob = document.querySelector(".profile__job");
  const editUserName = document.querySelector(".edit__username");
  const editUserJob = document.querySelector(".edit__job");
  const submitButton = document.querySelector(".edit__submit");

  setTimeout(() => {
    editUserName.value = userName.textContent;
    editUserJob.value = userJob.textContent;
    submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      updateProfile(userName, userJob, editUserName, editUserJob, templateNode);
    });
  }, 1);
}

// update user profile data
function updateProfile(
  userName,
  userJob,
  editUserName,
  editUserJob,
  templateNode
) {
  const maxChars = 20;

  userName.textContent = editUserName.value.slice(0, maxChars);
  userJob.textContent = editUserJob.value.slice(0, maxChars);

  if (userName.length > maxChars || userJob.length > maxChars) {
    alert("Max chars exceeded");
    return;
  }

  removePopUp(templateNode);
}

// define global variables for heart button
const heartActive = document.querySelectorAll(".element__heart-btn");

// heart button handler
heartActive.forEach((element) => {
  element.addEventListener("click", function () {
    let isActive = element.classList.contains("element__heart-btn_active");

    if (!isActive) {
      element.classList.add("element__heart-btn_active");
    } else {
      element.classList.remove("element__heart-btn_active");
    }
  });
});
