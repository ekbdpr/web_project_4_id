class FormValidator {
  constructor(formList, inputList) {
    this._formList = formList;
    this._inputList = inputList;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add("form__input_type_error");
    errorElement.classList.add("form__input-error");
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error");
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInputInvalid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._hasInputInvalid()) {
      buttonElement.classList.add("btn_inactive");
    } else {
      buttonElement.classList.remove("btn_inactive");
    }
  }

  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(".form__input"));
    const buttonElement = formElement.querySelector(".btn");

    this._toggleButtonState(buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  enableValidation() {
    this._formList = Array.from(document.querySelectorAll(".form"));
    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}

export { FormValidator };
