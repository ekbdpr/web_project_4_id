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
