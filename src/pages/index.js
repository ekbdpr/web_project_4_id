import "../styles/index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  deleteCard,
  toggleHeart,
  editProfileActive,
  editProfileInactive,
} from "../utils/utils.js";
import {
  validationElements,
  content,
  element,
  cardTemplate,
  profileTemplate,
  editTemplate,
  addTemplate,
  showPictureTemplate,
  editButtonSelector,
  addButtonSelector,
  profileUserSelector,
  profileAboutSelector,
  profilePictureSelector,
} from "../utils/constants.js";
// ----------------------------------------------------------------
// initialize cards api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_idn_02",
  headers: {
    authorization: "008c1c55-3b56-46f6-9605-a10cac4bcdce",
    "Content-Type": "application/json",
  },
});
// ----------------------------------------------------------------
// rendering cards to page
const loadCards = () => {
  api
    .getInitialCard()
    .then((result) => {
      const cardList = new Section(
        {
          items: result,
          renderer: (item) => {
            const card = new Card(
              {
                handleCardClick: (evt) => {
                  popupImage(evt);
                },

                handleDeleteClick: (evt) => {
                  api
                    .deleteCard(item._id)
                    .then(() => {
                      deleteCard(evt);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },

                handleLikeClick: (evt) => {
                  api
                    .likeCard(item._id)
                    .then(() => {
                      toggleHeart(evt);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
      cardList.clear();
      cardList.renderItems();
    })
    .catch((err) => {
      console.log(err);
    });
};
loadCards();
//----------------------------------------------------------------
// get current user info
const getUserInfo = () => {
  api.getUserInfo().then((data) => {
    profilePictureSelector.src = data.avatar;
    profileUserSelector.textContent = data.name;
    profileAboutSelector.textContent = data.about;
  });
};
getUserInfo();

const userInfo = new UserInfo({
  userName: profileUserSelector,
  userAbout: profileAboutSelector,
});
// ----------------------------------------------------------------
// popup add modal
const popupProfileForm = new Section(
  {
    items: profileTemplate,
    renderer: (item) => {
      const popupWindows = new PopupWithForm(
        {
          handleEventSubmit: (value) => {
            api
              .setUserPicture(value.link)
              .then(() => {
                getUserInfo();
                popupWindows.close();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        item
      );
      const showFormModal = popupWindows.open();
      const validation = new FormValidator(validationElements, showFormModal);
      validation.enableValidation();
      popupProfileForm.addItem(showFormModal);
    },
  },
  content
);
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
            api
              .setUserInfo(value)
              .then(() => {
                popupWindows.close();
              })
              .catch((err) => {
                console.log(err);
              });
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
            api
              .postCard(newCard)
              .then(() => {
                setTimeout(() => {
                  loadCards();
                }, 100);
              })
              .catch((err) => {
                console.log(err);
              });
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
// popup image modal
const popupImage = (evt) => {
  const showPopup = new Section(
    {
      items: evt.target,
      renderer: (item) => {
        const imageModal = new PopupWithImage(item, showPictureTemplate);
        const showImageModal = imageModal.open();
        showPopup.addItem(showImageModal);
      },
    },
    content
  );
  showPopup.renderItems();
};
// ----------------------------------------------------------------
// global event listeners
profilePictureSelector.addEventListener("click", () => {
  popupProfileForm.renderItems();
});
editButtonSelector.addEventListener("click", () => {
  popupEditForm.renderItems();
});
addButtonSelector.addEventListener("click", () => {
  popupAddForm.renderItems();
});
profilePictureSelector.addEventListener("mouseover", editProfileActive);
profilePictureSelector.addEventListener("mouseout", editProfileInactive);
// ---------------------------------------------------------------
