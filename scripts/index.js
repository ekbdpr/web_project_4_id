import { enableValidation } from "./validation.js";

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

// const for selectors
const SELECTORS = {
  ADD_BUTTON: ".btn__add",
  ADD_MODAL_TEMP: "#add-card-template",
  ADD_TEMP: ".add-card",
  BUTTON_CLOSE: ".btn__close",
  BUTTON_SUBMIT: ".btn__submit",
  CARD_CONTAINER: ".element",
  CARD_DELETE: ".element__delete-btn",
  CARD_HEART: ".element__heart-btn",
  CARD_IMAGE: ".element__image",
  CARD_MODAL_TEMP: "#card-template",
  CARD_TEMP: ".element__item",
  CARD_TEXT: ".element__text",
  EDIT_BUTTON: ".btn__edit",
  EDIT_MODAL_TEMP: "#edit-profile-template",
  EDIT_TEMP: ".edit-profile",
  FORM: ".form",
  FORM_INPUT: ".form__input",
  MAIN_BODY: ".content",
  MODAL_TEMP: null,
  PAGE: ".pages",
  PICTURE_IMAGE: ".show-picture__image",
  PICTURE_MODAL_TEMP: "#show-picture-template",
  PICTURE_TEMP: ".show-picture",
  PICTURE_TEXT: ".show-picture__text",
  PROFILE_ABOUT: ".profile__about",
  PROFILE_USERNAME: ".profile__username",
};

// reusable functions
function getElement(selector) {
  return document.querySelector(selector);
}

function getElementClone(clone, selector) {
  return clone.querySelector(selector);
}

function cloneElement(node, selector) {
  return node.querySelector(selector).cloneNode(true);
}

function addEventListener(selector, event, callback) {
  getElement(selector).addEventListener(event, callback);
}

// main functions
initialCards.forEach((card) => showCard(card));

function showCard(card) {
  const cardTemp = getElement(SELECTORS.CARD_MODAL_TEMP).content;
  const cardClone = cloneElement(cardTemp, SELECTORS.CARD_TEMP);

  getElementClone(cardClone, SELECTORS.CARD_IMAGE).src = card.link;
  getElementClone(cardClone, SELECTORS.CARD_IMAGE).alt = card.name;
  getElementClone(cardClone, SELECTORS.CARD_TEXT).textContent = card.name;

  cardClone
    .querySelector(SELECTORS.CARD_IMAGE)
    .addEventListener("click", (evt) => {
      showTemp(
        SELECTORS.PICTURE_MODAL_TEMP,
        SELECTORS.PICTURE_TEMP,
        SELECTORS.BUTTON_CLOSE,
        evt
      );
    });

  cardClone
    .querySelector(SELECTORS.CARD_HEART)
    .addEventListener("click", (evt) => heartButtonToggle(evt));

  cardClone
    .querySelector(SELECTORS.CARD_DELETE)
    .addEventListener("click", (evt) => removeCard(card, evt));

  getElement(SELECTORS.CARD_CONTAINER).prepend(cardClone);
}

function addCard(evt) {
  evt.preventDefault();

  const formInput = Array.from(document.querySelectorAll(SELECTORS.FORM_INPUT));
  const newCard = {
    name: formInput[0].value,
    link: formInput[1].value,
  };

  initialCards.push(newCard);
  showCard(newCard);

  hidePopUp();
}

function removeCard(card, evt) {
  const index = initialCards.indexOf(card);
  if (index > -1) {
    initialCards.splice(index, 1);
  }
  evt.target.closest(".element__item").remove();
}

function showTemp(templateSelector, contentSelector, closeBtnSelector, evt) {
  const templateId = getElement(templateSelector).content;
  const templateClone = cloneElement(templateId, contentSelector);
  SELECTORS.MODAL_TEMP = templateClone;

  const clickOutsideModal = (evt) => {
    if (!templateClone.contains(evt.target)) {
      hidePopUp();
      document.removeEventListener("click", clickOutsideModal);
    }
  };

  const keydownHandler = (evt) => {
    if (evt.key === "Escape" && document.contains(templateClone)) {
      hidePopUp();

      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("click", clickOutsideModal);
    }
  };

  switch (contentSelector) {
    case SELECTORS.EDIT_TEMP:
      profileValue(clickOutsideModal);
      break;

    case SELECTORS.PICTURE_TEMP:
      const target = evt.target;
      getElementClone(templateClone, SELECTORS.PICTURE_IMAGE).src =
        target.getAttribute("src");
      getElementClone(templateClone, SELECTORS.PICTURE_IMAGE).alt =
        target.getAttribute("alt");
      getElementClone(templateClone, SELECTORS.PICTURE_TEXT).textContent =
        target.getAttribute("alt");
      break;

    case SELECTORS.ADD_TEMP:
      setTimeout(() => {
        addEventListener(SELECTORS.BUTTON_SUBMIT, "click", (evt) => {
          addCard(evt);
          document.removeEventListener("click", clickOutsideModal);
        });
      }, 100);
      break;

    default:
      break;
  }

  getElement(SELECTORS.MAIN_BODY).appendChild(templateClone);
  togglePage(templateClone);

  addEventListener(closeBtnSelector, "click", () => {
    hidePopUp();
    document.removeEventListener("click", clickOutsideModal);
  });

  document.addEventListener("keydown", keydownHandler);

  setTimeout(() => {
    document.addEventListener("click", clickOutsideModal);
    enableValidation();
  }, 100);
}

function hidePopUp() {
  SELECTORS.MODAL_TEMP.style.opacity = 0;
  setTimeout(() => {
    togglePage(SELECTORS.MODAL_TEMP);
    SELECTORS.MODAL_TEMP.remove();
    SELECTORS.MODAL_TEMP = null;
  }, 200);
}

function togglePage(temp) {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  setTimeout(() => {
    temp.classList.toggle("popUp");
    getElement(SELECTORS.PAGE).classList.toggle("pages_disabled");
    getElement(SELECTORS.MAIN_BODY).style.overflow =
      getElement(SELECTORS.MAIN_BODY).style.overflow === "hidden"
        ? "auto"
        : "hidden";
    getElement(
      SELECTORS.MAIN_BODY
    ).style.width = `calc(100% - ${scrollbarWidth}px)`;
  }, 100);
}

function profileValue(clickOutsideModal) {
  setTimeout(() => {
    const formInput = Array.from(
      document.querySelectorAll(SELECTORS.FORM_INPUT)
    );

    formInput.forEach((input, index) => {
      if (index === 0) {
        input.value = getElement(SELECTORS.PROFILE_USERNAME).textContent;
      } else if (index === 1) {
        input.value = getElement(SELECTORS.PROFILE_ABOUT).textContent;
      }
    });

    addEventListener(SELECTORS.BUTTON_SUBMIT, "click", (evt) => {
      submitProfileChanges(evt, clickOutsideModal);
    });
  }, 100);
}

function submitProfileChanges(evt, clickOutsideModal) {
  evt.preventDefault();

  const formInput = Array.from(document.querySelectorAll(SELECTORS.FORM_INPUT));

  formInput.forEach((input, index) => {
    if (index === 0) {
      getElement(SELECTORS.PROFILE_USERNAME).textContent = input.value;
    } else if (index === 1) {
      getElement(SELECTORS.PROFILE_ABOUT).textContent = input.value;
    }
  });

  hidePopUp();
  document.removeEventListener("click", clickOutsideModal);
}

function heartButtonToggle(evt) {
  evt.target.classList.toggle("element__heart-btn_active");
}

// global event listener
addEventListener(SELECTORS.EDIT_BUTTON, "click", () =>
  showTemp(
    SELECTORS.EDIT_MODAL_TEMP,
    SELECTORS.EDIT_TEMP,
    SELECTORS.BUTTON_CLOSE
  )
);

addEventListener(SELECTORS.ADD_BUTTON, "click", () =>
  showTemp(SELECTORS.ADD_MODAL_TEMP, SELECTORS.ADD_TEMP, SELECTORS.BUTTON_CLOSE)
);
