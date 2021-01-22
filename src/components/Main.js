import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [ cards, setCards ] = React.useState([]);

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
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content"> 
          <div className="profile__avatar-container">  
            <div 
              className="profile__image" 
              style={{ backgroundImage: `url(${currentUser.avatar})` }} 
              alt={`Изображение ${currentUser.name}`}>
            </div>
            <button className="button button_action_update-avatar" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">                       
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="button button_action_edit" onClick={onEditProfile} type="button" 
              aria-label="Открыть форму редактирования"></button>                      
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>

        <button className="button button_action_add" onClick={onAddPlace} 
          type="button" aria-label="Добавить информацию"></button>
      </section>

      <section className="cards-grid">
        <ul className="cards-grid__list">
          {
            cards.map(({ _id, ...props}) => <Card key={_id} _id={_id} {...props} onCardClick={onCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>)
          }
        </ul>
      </section>      
    </main>
  )
}

export default Main;