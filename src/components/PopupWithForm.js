import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleEventSubmit }, popup) {
    super(popup);
    this._handleEventSubmit = handleEventSubmit;
  }

  renderLoading(isLoading, save) {
    if (isLoading) {
      this._element.querySelector(".btn__submit").textContent = "Menyimpan...";
    } else {
      this._element.querySelector(".btn__submit").textContent = save;
    }
  }

  _getInputValues() {
    this._formValues = {};

    Array.from(this._element.querySelectorAll(".form__input")).forEach(
      (input) => {
        this._formValues[input.name] = input.value;
      }
    );

    return this._formValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleEventSubmit(this._getInputValues());
    });
  }
}
