// // import module
// import { cardList, togglePage, pageContent } from "../pages/index.js";
// import { initialCards, profileUserSelector, profileAboutSelector } from "./constants.js";
// // ----------------------------------------------------------------
// // container
// let templateContainer = "";
// // ----------------------------------------------------------------
// // Modal Window functionality
// function showModalWindow(tempId, tempContainer, evt) {
//   const getTemplate = document
//     .querySelector(tempId)
//     .content.querySelector(tempContainer)
//     .cloneNode(true);

//   templateContainer = getTemplate;

//   switch (tempContainer) {
//     case ".edit-profile":
//       setTimeout(() => {
//         profileValue();
//       }, 100);
//       break;

//     case ".add-card":
//       setTimeout(() => {
//         addNewCardHandler();
//       }, 100);
//       break;

//     case ".show-picture":
//       pictureModalHandler(evt);
//       break;
//   }
//   pageContent.append(getTemplate);

//   togglePage(getTemplate);

//   document.querySelector(".btn__close").addEventListener("click", () => {
//     removeEvtListener();
//   });

//   document.addEventListener("keydown", keydownHandler);

//   setTimeout(() => {
//     if (tempContainer === ".edit-profile" || tempContainer === ".add-card") {
//       getTemplate.querySelector("input").focus();
//     }
//     document.addEventListener("click", closeOnClickAway);
//   }, 100);
// }
// // ----------------------------------------------------------------
// // remove event listeners when pressing esc or clicking outside of modal window
// function removeEvtListener() {
//   hidePopUp();
//   document.removeEventListener("keydown", keydownHandler);
//   document.removeEventListener("click", closeOnClickAway);
// }

// function hidePopUp() {
//   templateContainer.style.opacity = 0;
//   setTimeout(() => {
//     togglePage(templateContainer);
//     templateContainer.remove();
//     templateContainer = "";
//   }, 200);
// }

// function closeOnClickAway(evt) {
//   if (!templateContainer.contains(evt.target)) {
//     removeEvtListener();
//   }
// }

// function keydownHandler(evt) {
//   if (evt.key === "Escape" && document.contains(templateContainer)) {
//     removeEvtListener();
//   }
// }
// // ----------------------------------------------------------------

// // show edit form modal window and edit button functions
// function profileValue() {
//   const formInput = Array.from(document.querySelectorAll(".form__input"));

//   formInput.forEach((input, index) => {
//     if (index === 0) {
//       input.value = profileUserSelector.textContent;
//     } else if (index === 1) {
//       input.value = profileAboutSelector.textContent;
//     }
//   });
//   document.querySelector(".btn__submit").addEventListener("click", (evt) => {
//     submitProfileChanges(evt);
//   });
// }

// function submitProfileChanges(evt) {
//   evt.preventDefault();

//   const formInput = Array.from(document.querySelectorAll(".form__input"));

//   formInput.forEach((input, index) => {
//     if (index === 0) {
//       profileUserSelector.textContent = input.value;
//     } else if (index === 1) {
//       profileAboutSelector.textContent = input.value;
//     }
//   });

//   removeEvtListener();
// }
// // ----------------------------------------------------------------
// // show add form modal window and add new card button functionality
// function addNewCard(evt) {
//   evt.preventDefault();

//   const formInput = Array.from(document.querySelectorAll(".form__input"));
//   const newCard = {
//     name: formInput[0].value,
//     link: formInput[1].value,
//   };
//   initialCards.unshift(newCard);
//   cardList.clear();
//   cardList.renderItems();
// }

// function addNewCardHandler() {
//   document.querySelector(".btn__submit").addEventListener("click", (evt) => {
//     addNewCard(evt);
//     removeEvtListener();
//   });
// }
// // ----------------------------------------------------------------
// // show picture modal window
// function pictureModalHandler(evt) {
//   const target = evt.target;
//   templateContainer.querySelector(".show-picture__image").src =
//     target.getAttribute("src");
//   templateContainer.querySelector(".show-picture__image").alt =
//     target.getAttribute("alt");
//   templateContainer.querySelector(".show-picture__text").textContent =
//     target.getAttribute("alt");
// }
// // ----------------------------------------------------------------
// export { showModalWindow, templateContainer };
import { contentSelector, mainContentSelector } from "../utils/constants.js";
// ----------------------------------------------------------------
// toggle page & scrollbar visibility when a modal window is opened and closed
export function pageSettings() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  mainContentSelector.classList.toggle("main-content_disabled");
  contentSelector.style.overflow =
    contentSelector.style.overflow === "hidden" ? "auto" : "hidden";
  contentSelector.style.width = `calc(100% - ${scrollbarWidth}px)`;
}
// ----------------------------------------------------------------
