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

    this._image = this._element.querySelector(".element__image");
    this._imageText = this._element.querySelector(".element__text");
    this._cardLikes = this._element.querySelector(".element__like-counts");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._imageText.textContent = this._name;
    this._cardLikes.textContent = this._likes.length;

    this._setEventListeners();
    this._initialLikeState();

    return this._element;
  }

  deleteCard(e) {
    e.target.closest(".element__item").remove();
  }

  toggleLike() {
    this._heartButton = this._element.querySelector(".element__heart-btn");
    this._cardLikes = this._element.querySelector(".element__like-counts");

    this._heartButton.classList.toggle("element__heart-btn_active");
    this._cardLikes.textContent = this._likes.length;
  }

  _initialLikeState() {
    if (this.isLiked()) {
      this._heartButton.classList.add("element__heart-btn_active");
    } else {
      this._heartButton.classList.remove("element__heart-btn_active");
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._owner._id);
  }

  _setEventListeners() {
    this._heartButton = this._element.querySelector(".element__heart-btn");
    this._deleteButton = this._element.querySelector(".element__delete-btn");

    this._heartButton.addEventListener("click", this._handleLikeClick);
    this._deleteButton.addEventListener("click", this._handleDeleteClick);
    this._image.addEventListener("click", this._handleCardClick);
  }
}
