import { pageSettings } from "../utils/utils";

export default class PopUp {
  constructor(popUp) {
    this._popUp = popUp;
  }

  _getTemplate() {
    this._class = this._popUp.replace("#", ".").replace("-template", "");

    const popUpElement = document
      .querySelector(this._popUp)
      .content.querySelector(this._class)
      .cloneNode(true);

    return popUpElement;
  }

  _handleEscClose(evt) {
    console.log("Escape key pressed");
    if (evt.key === "Escape" && document.contains(this._element)) {
      this.close();
      this._removeEventListeners();
    }
  }

  open() {
    this._element = this._getTemplate();

    pageSettings();
    setTimeout(() => {
      this.setEventListeners();
      this._element.classList.toggle("popUp");
    }, 100);

    return this._element;
  }

  close() {
    pageSettings();
    setTimeout(() => {
      this._element.remove();
    }, 100);
  }

  setEventListeners() {
    this._closeButton = this._element.querySelector(".btn__close");

    this._closeButton.addEventListener("click", () => this.close());
    this._handleEscCloseFn = (evt) => this._handleEscClose(evt);
    document.addEventListener("keydown", this._handleEscCloseFn);
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscCloseFn);
  }
}
