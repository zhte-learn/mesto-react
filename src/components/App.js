import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [ isEditProfilePopupOpen, setEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null); 

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleClosePopupOverlay = (event) => {
    const target = event.target;
    if(target.classList.contains('popup') || target.classList.contains('popup__close')) {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  React.useEffect(() => {
    function handleEsc (event) {
      if (event.keyCode === 27) 
        closeAllPopups();
    }
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  })

  return (
    <div className="page">      
      <Header />

      <div className="page__container">
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />
      </div>

      <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />

      <PopupWithForm 
        title='Редактировать профиль'
        children={
          <>
          <input id="name-input" name="name" type="text" className="form__input form__input_text_name" 
            placeholder="Имя" minLength="2" maxLength="40" required />
          <span id="name-input-error" className="form__input-error"></span>

          <input id="about-input" name="about" type="text" className="form__input form__input_text_job" 
            placeholder="Род деятельности" minLength="2" maxLength="200" required />
          <span id="about-input-error" className="form__input-error"></span>
          </>
        }
        btnTitle='Сохранить'
        name='edit'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />

      <PopupWithForm
        title='Новое место'
        children={
          <>
            <input id="name-input" name = "name" type="text" className="form__input form__input_text_place" 
              placeholder="Название" minLength="1" maxLength="30" required />
            <span id="name-input-error" className="form__input-error"></span>

            <input id="url-input" name = "link" type="url" className="form__input form__input_text_link" 
              placeholder="Ссылка на картинку" required />
            <span id="url-input-error" className="form__input-error"></span>  
          </>
        }
        btnTitle='Создать'
        name='add'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />

      <PopupWithForm
        title='Обновить аватар'
        children={
          <>
            <input id="url-input" name="avatar" type="url" className="form__input form__input_text_link" 
              placeholder="Ссылка на картинку" required />
            <span id="url-input-error" className="form__input-error"></span>  
          </>
        }
        btnTitle='Сохранить'
        name='update-avatar'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />

      <PopupWithForm
        title='Вы уверены?'
        btnTitle='Да'
        name='confirm'
        isOpen={false}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />

    </div>
  );
}

export default App;