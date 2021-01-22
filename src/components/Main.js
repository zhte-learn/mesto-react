import React from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllCards()
    .then(data => {
      setCards(data);
    })
    .catch((error) => alert(error))
  }, []);

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
            cards.map(({ _id, ...props}) => <Card key={_id} {...props} onCardClick={onCardClick}/>)
          }
        </ul>
      </section>      
    </main>
  )
}

export default Main;