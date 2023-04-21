import { initialCards } from "./constants.js";
import { showModalWindow } from "./utils.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    return this._element;
  }

  _handleHeartButton(evt) {
    evt.target.classList.toggle("element__heart-btn_active");
  }

  _handleDeleteButton(evt) {
    const index = initialCards.findIndex((item) => item.name === this._name);
    initialCards.splice(index, 1);
    this._removeEventListeners();
    evt.target.closest(".element__item").remove();
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart-btn")
      .addEventListener("click", this._handleHeartButton.bind(this));

    this._element
      .querySelector(".element__delete-btn")
      .addEventListener("click", this._handleDeleteButton.bind(this));

    this._element
      .querySelector(".element__image")
      .addEventListener("click", (evt) => {
        showModalWindow("#show-picture-template", ".show-picture", evt);
      });
  }

  _removeEventListeners() {
    this._element
      .querySelector(".element__heart-btn")
      .removeEventListener("click", this._handleHeartButton);

    this._element
      .querySelector(".element__delete-btn")
      .removeEventListener("click", this._handleDeleteButton);

    this._element
      .querySelector(".element__image")
      .removeEventListener("click", (evt) => {
        showModalWindow("#show-picture-template", ".show-picture", evt);
      });
  }
}

export { Card };
