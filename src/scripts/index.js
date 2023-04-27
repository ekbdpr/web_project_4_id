import "../index/index.css";
import { Card } from "./Card.js";
import { initialCards, validationConfigs, pageContent } from "./constants.js";
import { showModalWindow, templateContainer } from "./utils.js";
import { FormValidator } from "./FormValidator.js";

// pushing page contents to web page
function renderElements() {
  const element = document.querySelector(".element");
  element.innerHTML = "";
  initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    element.prepend(cardElement);
  });
}
renderElements();
//----------------------------------------------------------------
// toggle page scrollbar visibility when a modal window is opened and closed
function togglePage(temp) {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  setTimeout(() => {
    temp.classList.toggle("popUp");
    document.querySelector(".pages").classList.toggle("pages_disabled");
    pageContent.style.overflow =
      pageContent.style.overflow === "hidden" ? "auto" : "hidden";
    pageContent.style.width = `calc(100% - ${scrollbarWidth}px)`;
  }, 100);
}
// ----------------------------------------------------------------
function enableValidator() {
  const formValidation = new FormValidator(
    templateContainer,
    validationConfigs
  );
  formValidation.enableValidation();
}
// event listeners for edit and add button events
document.querySelector(".btn_edit").addEventListener("click", () => {
  showModalWindow("#edit-profile-template", ".edit-profile");
  enableValidator();
});

document.querySelector(".btn_add").addEventListener("click", () => {
  showModalWindow("#add-card-template", ".add-card");
  enableValidator();
});
// ----------------------------------------------------------------
export { renderElements, togglePage, pageContent };
