import {
  contentSelector,
  mainContentSelector,
  elementItem,
} from "../utils/constants.js";
// ----------------------------------------------------------------
// toggle page & scrollbar visibility when a modal window is opened and closed
export const pageSettings = () => {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  mainContentSelector.classList.toggle("main-content_disabled");
  contentSelector.style.overflow =
    contentSelector.style.overflow === "hidden" ? "auto" : "hidden";
  contentSelector.style.width = `calc(100% - ${scrollbarWidth}px)`;
};
// ----------------------------------------------------------------
// toggle like button
export const toggleHeart = (evt) => {
  evt.target.classList.toggle("element__heart-btn_active");
};
// ----------------------------------------------------------------
// delete card
export const deleteCard = (evt) => {
  evt.target.closest(elementItem).remove();
};
// ----------------------------------------------------------------
