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

// create card and prepend to array + delete the card when clicked
function createCard(card) {
  const elementsList = document.querySelector(".element");

  const cardTemplate = document.querySelector("#cardTemp").content;
  const cardElement = cardTemplate
    .querySelector(".element__item")
    .cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  const elementText = cardElement.querySelector(".element__text");
  const elementDelete = cardElement.querySelector(".element__delete-btn");

  elementImage.src = card.link;
  elementImage.alt = card.name;
  elementText.textContent = card.name;

  elementImage.addEventListener("click", () => {
    showPopUp("#showPictTemp", ".show-picture", ".show-picture__close", card);
  });

  elementDelete.addEventListener("click", (event) => {
    const index = initialCards.indexOf(card);
    if (index > -1) {
      initialCards.splice(index, 1);
    }
    event.target.closest(".element__item").remove();
  });

  elementsList.prepend(cardElement);
}

// insert card to the page based on the array of cards
initialCards.forEach((card) => {
  createCard(card);
});

// submit new card
function newPost() {
  const titleInput = document.querySelector(".add__title");
  const linkInput = document.querySelector(".add__link");
  const addSubmit = document.querySelector(".add__submit");

  addSubmit.addEventListener("click", (evt) => {
    evt.preventDefault();

    const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };

    initialCards.push(newCard);

    createCard(newCard);

    heartButtonHandler();

    const templateNode = document.querySelector(".add");
    removePopUp(templateNode);
  });
}

// define global variables for popUp
const mainBody = document.querySelector(".content");
const page = document.querySelector(".pages");
const editProfileBtn = document.querySelector(".profile__btn-edit");
const addPostBtn = document.querySelector(".profile__btn-add");

// event listeners
editProfileBtn.addEventListener("click", () => {
  showPopUp("#editProfileTemp", ".edit", ".edit__close");
});
addPostBtn.addEventListener("click", () =>
  showPopUp("#addPostTemp", ".add", ".add__close")
);

// show popUp window handler
function showPopUp(element, elementClass, closeElement, card) {
  const templateId = document.querySelector(element).content;
  const templateNode = templateId.querySelector(elementClass).cloneNode(true);

  mainBody.append(templateNode);

  if (element === "#editProfileTemp") {
    profileData(templateNode);
  }

  if (element === "#addPostTemp") {
    newPost();
  }

  if (element === "#showPictTemp") {
    const targetImage = document.querySelector(".show-picture__image");
    const targetText = document.querySelector(".show-picture__text");

    targetImage.src = card.link;
    targetImage.alt = card.name;
    targetText.textContent = card.name;
  }

  setTimeout(() => {
    templateNode.classList.add("popUp");
    page.classList.add("pages_dimmed");
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

  if (
    editUserName.value.length > maxChars ||
    editUserJob.value.length > maxChars
  ) {
    alert("Max chars exceeded");
    return;
  }

  removePopUp(templateNode);
}

// heart button handler
function heartButtonHandler() {
  const heartActive = document.querySelectorAll(".element__heart-btn");

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
}

heartButtonHandler();
