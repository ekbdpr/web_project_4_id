export default class Card {
  constructor(
    { handleCardClick, handleDeleteClick, handleLikeClick },
    data,
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
    this._element.querySelector(".element__like-counts").textContent =
      this._likes.length;

    this._toggleHeart();

    return this._element;
  }

  _toggleHeart() {
    if (this.isLiked()) {
      this._element
        .querySelector(".element__heart-btn")
        .classList.add("element__heart-btn_active");
    } else {
      this._element
        .querySelector(".element__heart-btn")
        .classList.remove("element__heart-btn_active");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._owner._id);
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__heart-btn")
      .addEventListener("click", this._handleLikeClick);

    this._element
      .querySelector(".element__delete-btn")
      .addEventListener("click", this._handleDeleteClick);

    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);
  }
}
