import { initialCards, Card } from "./Card.js";
import { showModalWindow } from "./utils.js";

const pageContent = document.querySelector(".content");
// pushing page contents to web page
const renderElements = () => {
  const element = document.querySelector(".element");
  element.innerHTML = "";
  initialCards.forEach((item) => {
    const card = new Card(item, "#card-template");
    const cardElement = card.generateCard();
    element.prepend(cardElement);
  });
};
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
// event listeners for edit and add button events
document
  .querySelector(".btn_edit")
  .addEventListener("click", () =>
    showModalWindow("#edit-profile-template", ".edit-profile")
  );

document
  .querySelector(".btn_add")
  .addEventListener("click", () =>
    showModalWindow("#add-card-template", ".add-card")
  );
// ----------------------------------------------------------------
export { renderElements, togglePage, pageContent };
