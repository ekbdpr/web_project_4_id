export const initialCards = [
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

export const validationElements = {
  formInputSelector: ".form__input",
  submitButtonSelector: ".btn__submit",
  inputErrorModifier: "form__input-error",
  errorModifier: "form__input_type_error",
  buttonErrorModifier: "btn_inactive",
};

export const cardElements = {
  cardContainer: ".element__item",
  cardImage: ".element__image",
  cardText: ".element__text",
  cardHeartButton: ".element__heart-btn",
  cardDeleteButton: ".element__delete-btn",
};

export const profileUserSelector = document.querySelector(".profile__username");
export const profileAboutSelector = document.querySelector(".profile__about");
export const contentSelector = document.querySelector(".content");
export const mainContentSelector = document.querySelector(".main-content");
export const editButtonSelector = document.querySelector(".btn_edit");
export const addButtonSelector = document.querySelector(".btn_add");

export const content = ".content";
export const element = ".element";
export const editTemplate = "#edit-profile-template";
export const addTemplate = "#add-card-template";
export const cardTemplate = "#card-template";
export const showPictureTemplate = "#show-picture-template";
