import { pageSettings } from "../utils/utils";

export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  _getTemplate() {
    this._class = this._popup.replace("#", ".").replace("-template", "");

    this._popupElement = document
      .querySelector(this._popup)
      .content.querySelector(this._class)
      .cloneNode(true);

    return this._popupElement;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" && document.contains(this._element)) {
      this.close();
    }
  }

  _handleClickOutClose(evt) {
    if (!this._element.contains(evt.target)) {
      this.close();
    }
  }

  open() {
    this._element = this._getTemplate();
    setTimeout(() => {
      pageSettings();
      this._setEventListeners();
      this._element.classList.toggle("popup");
    }, 100);

    return this._element;
  }

  close() {
    pageSettings();
    this._removeEventListeners();
    this._element.remove();
  }

  _setEventListeners() {
    this._closeButton = this._element.querySelector(".btn__close");
    this._handleEscCloseFn = (evt) => this._handleEscClose(evt);
    this._handleClickOutCloseFn = (evt) => this._handleClickOutClose(evt);

    this._closeButton.addEventListener("click", () => this.close());
    document.addEventListener("keydown", this._handleEscCloseFn);
    document.addEventListener("mousedown", this._handleClickOutCloseFn);
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscCloseFn);
    document.removeEventListener("mousedown", this._handleClickOutCloseFn);
  }
}
