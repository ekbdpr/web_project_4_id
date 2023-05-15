import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ handleEventSubmit }, popup) {
    super(popup);
    this._handleEventSubmit = handleEventSubmit;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._yesButton = this._element.querySelector(".btn__submit");

    this._yesButton.addEventListener("click", this._handleEventSubmit);
  }
}
