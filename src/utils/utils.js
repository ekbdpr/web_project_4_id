import {
  contentSelector,
  mainContentSelector,
  profileEditSelector,
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
// display edit profile picture button
export const editProfileActive = () => {
  profileEditSelector.style.display = "block";
};
// ----------------------------------------------------------------
// remove edit profile picture button
export const editProfileInactive = () => {
  profileEditSelector.style.display = "none";
};
// ----------------------------------------------------------------
