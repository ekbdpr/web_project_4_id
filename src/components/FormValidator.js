export default class FormValidator {
  constructor(items, formElement) {
    this._formInputSelector = items.formInputSelector;
    this._submitButtonSelector = items.submitButtonSelector;
    this._inputErrorModifier = items.inputErrorModifier;
    this._errorModifier = items.errorModifier;
    this._buttonErrorModifier = items.buttonErrorModifier;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._errorModifier);
    errorElement.classList.add(this._inputErrorModifier);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._errorModifier);
    errorElement.classList.remove(this._inputErrorModifier);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInputInvalid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInputInvalid()) {
      this._button.classList.add(this._buttonErrorModifier);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._buttonErrorModifier);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._formInputSelector)
    );
    this._button = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
