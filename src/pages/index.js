import "../styles/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopUp from "../components/Popup.js";
import {
  initialCards,
  validationElements,
  content,
  element,
  editTemplate,
} from "../utils/constants.js";
// ----------------------------------------------------------------
// pushing page contents to web page
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template");
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  element
);

cardList.renderItems();
//----------------------------------------------------------------
// open and close popup modal window
const showPopUp = new Section(
  {
    items: [editTemplate],
    renderer: (item) => {
      const popUpElement = new PopUp(item);
      const show = popUpElement.open();

      showPopUp.addItem(show);
    },
  },
  content
);

document.querySelector(".btn_edit").addEventListener("click", () => {
  showPopUp.renderItems();
});
// ----------------------------------------------------------------
// form validator
function enableValidator() {
  const formValidation = new FormValidator(
    validationElements,
    templateContainer
  );
  formValidation.enableValidation();
}
// ----------------------------------------------------------------
// event listeners for edit and add button events
// document.querySelector(".btn_edit").addEventListener("click", () => {
//   showModalWindow("#edit-profile-template", ".edit-profile");
//   enableValidator();
// });

// document.querySelector(".btn_add").addEventListener("click", () => {
//   showModalWindow("#add-card-template", ".add-card");
//   enableValidator();
// });
// ----------------------------------------------------------------

export { cardList, content };
