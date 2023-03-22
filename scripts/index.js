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
  ADD_BUTTON: ".profile__btn-add",
  ADD_CLOSE: ".add__close",
  ADD_LINK: ".add__link",
  ADD_MODAL_TEMP: "#addPostTemp",
  ADD_SUBMIT: ".add__submit",
  ADD_TEMP: ".add",
  ADD_TITLE: ".add__title",
  CARD_CONTAINER: ".element",
  CARD_DELETE: ".element__delete-btn",
  CARD_HEART: ".element__heart-btn",
  CARD_IMAGE: ".element__image",
  CARD_MODAL_TEMP: "#cardTemp",
  CARD_TEMP: ".element__item",
  CARD_TEXT: ".element__text",
  EDIT_BUTTON: ".profile__btn-edit",
  EDIT_CLOSE: ".edit__close",
  EDIT_JOB: ".edit__job",
  EDIT_MODAL_TEMP: "#editProfileTemp",
  EDIT_USERNAME: ".edit__username",
  EDIT_SUBMIT: ".edit__submit",
  EDIT_TEMP: ".edit",
  MAIN_BODY: ".content",
  MODAL_TEMP: null,
  PAGE: ".pages",
  PICTURE_CLOSE: ".show-picture__close",
  PICTURE_IMAGE: ".show-picture__image",
  PICTURE_MODAL_TEMP: "#showPictTemp",
  PICTURE_TEMP: ".show-picture",
  PICTURE_TEXT: ".show-picture__text",
  PROFILE_USERNAME: ".profile__username",
  PROFILE_JOB: ".profile__job",
};

// reusable functions
function getElement(selector) {
  return document.querySelector(selector);
}

function getElementClone(clone, selector) {
  return clone.querySelector(selector);
}

function getElementAll(selector) {
  return document.querySelectorAll(selector);
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
        SELECTORS.PICTURE_CLOSE,
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

  const newCard = {
    name: getElement(SELECTORS.ADD_TITLE).value,
    link: getElement(SELECTORS.ADD_LINK).value,
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

  switch (contentSelector) {
    case SELECTORS.EDIT_TEMP:
      profileValue();
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
        addEventListener(SELECTORS.ADD_SUBMIT, "click", addCard);
      }, 100);
      break;

    default:
      break;
  }

  getElement(SELECTORS.MAIN_BODY).appendChild(templateClone);
  togglePage(templateClone);

  setTimeout(() => {
    addEventListener(closeBtnSelector, "click", () => hidePopUp());
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
  setTimeout(() => {
    temp.classList.toggle("popUp");
    getElement(SELECTORS.PAGE).classList.toggle("pages_dimmed");
  }, 100);
}

function profileValue() {
  setTimeout(() => {
    getElement(SELECTORS.EDIT_USERNAME).value = getElement(
      SELECTORS.PROFILE_USERNAME
    ).textContent;
    getElement(SELECTORS.EDIT_JOB).value = getElement(
      SELECTORS.PROFILE_JOB
    ).textContent;

    addEventListener(SELECTORS.EDIT_SUBMIT, "click", submitProfileChanges);
  }, 100);
}

function submitProfileChanges(evt) {
  evt.preventDefault();

  const maxChars = 20;

  getElement(SELECTORS.PROFILE_USERNAME).textContent = getElement(
    SELECTORS.EDIT_USERNAME
  ).value.slice(0, maxChars);
  getElement(SELECTORS.PROFILE_JOB).textContent = getElement(
    SELECTORS.EDIT_JOB
  ).value.slice(0, maxChars);

  if (
    getElement(SELECTORS.EDIT_USERNAME).value.length > maxChars ||
    getElement(SELECTORS.EDIT_JOB).value.length > maxChars
  ) {
    alert("Max chars exceeded");
    return;
  }

  hidePopUp();
}

function heartButtonToggle(evt) {
  evt.target.classList.toggle("element__heart-btn_active");
}

// global event listener
addEventListener(SELECTORS.EDIT_BUTTON, "click", () =>
  showTemp(SELECTORS.EDIT_MODAL_TEMP, SELECTORS.EDIT_TEMP, SELECTORS.EDIT_CLOSE)
);

addEventListener(SELECTORS.ADD_BUTTON, "click", () =>
  showTemp(SELECTORS.ADD_MODAL_TEMP, SELECTORS.ADD_TEMP, SELECTORS.ADD_CLOSE)
);
