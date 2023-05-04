import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popup) {
    super(popup);
    this._image = data.src;
    this._text = data.alt;
  }

  open() {
    super.open();

    this._element.querySelector(".show-picture__image").src = this._image;
    this._element.querySelector(".show-picture__image").alt = this._text;
    this._element.querySelector(".show-picture__text").textContent = this._text;

    return this._element;
  }
}
