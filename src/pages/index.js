import "../styles/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationElements,
  content,
  element,
  cardTemplate,
  editTemplate,
  addTemplate,
  showPictureTemplate,
  editButtonSelector,
  addButtonSelector,
  profileUserSelector,
  profileAboutSelector,
} from "../utils/constants.js";
// ----------------------------------------------------------------
// rendering cards to page
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          handleCardClick: (evt) => {
            const showPopup = new Section(
              {
                items: evt.target,
                renderer: (item) => {
                  const imageModal = new PopupWithImage(
                    item,
                    showPictureTemplate
                  );
                  const showImageModal = imageModal.open();
                  showPopup.addItem(showImageModal);
                },
              },
              content
            );
            showPopup.renderItems();
          },
        },
        item,
        cardTemplate
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  element
);
cardList.renderItems();
//----------------------------------------------------------------
// get current user info
const userInfo = new UserInfo({
  userName: profileUserSelector,
  userAbout: profileAboutSelector,
});
// ----------------------------------------------------------------
// popup edit modal
const popupEditForm = new Section(
  {
    items: editTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            userInfo.setUserInfo({ name: value.name, about: value.title });
            popupWindows.close();
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const getInfo = userInfo.getUserInfo();
      const nameValue = showFormModal.querySelector('input[name="name"]');
      const aboutValue = showFormModal.querySelector('input[name="title"]');
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      setTimeout(() => {
        nameValue.value = getInfo.name;
        aboutValue.value = getInfo.about;
      }, 100);
      popupEditForm.addItem(showFormModal);
    },
  },
  content
);
// ----------------------------------------------------------------
// popup add modal
const popupAddForm = new Section(
  {
    items: addTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            const newCard = {
              name: value.title,
              link: value.link,
            };
            initialCards.unshift(newCard);
            cardList.clear();
            cardList.renderItems();
            popupWindows.close();
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      popupAddForm.addItem(showFormModal);
    },
  },
  content
);
// ----------------------------------------------------------------
// global event listeners
editButtonSelector.addEventListener("click", () => {
  popupEditForm.renderItems();
});
addButtonSelector.addEventListener("click", () => {
  popupAddForm.renderItems();
});
// ---------------------------------------------------------------
export { cardList };
