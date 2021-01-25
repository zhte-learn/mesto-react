import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null); 
  const [ currentUser, setCurrentUser ] = React.useState('');

  React.useEffect(() => {
    api.getUserData()
    .then(userData => {
      setCurrentUser(userData);
    })
    .catch((error) => alert(error)) 
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
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
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
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

  function handleUpdateUser(userData) {
    api.updateUserData(userData)
    .then((newUserData)=> {
      setCurrentUser(newUserData);
    })
    .catch((error) => alert(error))
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
    .then((newData) => {
      setCurrentUser(newData);
    })
  }

  return (
    <CurrentUserContext.Provider value = {currentUser}>
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

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onOverlay={handleClosePopupOverlay}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlay={handleClosePopupOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <PopupWithForm
        title='Новое место'
        btnTitle='Создать'
        name='add'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      >
        <input id="name-input" name = "name" type="text" className="form__input form__input_text_place" 
          placeholder="Название" minLength="1" maxLength="30" required />
        <span id="name-input-error" className="form__input-error"></span>

        <input id="url-input" name = "link" type="url" className="form__input form__input_text_link" 
          placeholder="Ссылка на картинку" required />
        <span id="url-input-error" className="form__input-error"></span>       
      </PopupWithForm>

      <PopupWithForm
        title='Вы уверены?'
        btnTitle='Да'
        name='confirm'
        isOpen={false}
        onClose={closeAllPopups}
        overlayClick={handleClosePopupOverlay}
      />
     
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;