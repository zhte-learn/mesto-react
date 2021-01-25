import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState(null); 
  const [ currentUser, setCurrentUser ] = React.useState('');
  //form Main
  const [ cards, setCards ] = React.useState([]);
  //

  React.useEffect(() => {
    api.getUserData()
    .then(userData => {
      setCurrentUser(userData);
    })
    .catch((error) => alert(error)) 
  }, []);

  //from Main
  React.useEffect(() => {
    api.getAllCards()
    .then(data => {
      setCards(data);
    })
    .catch((error) => alert(error))
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
    .catch((error) => alert(error))
  }
  //

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

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
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
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
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

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onOverlay={handleClosePopupOverlay}
        onAddPlaceSubmit={handleAddPlaceSubmit}
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
    </CurrentUserContext.Provider>
  );
}

export default App;