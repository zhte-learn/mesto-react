import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [ userName, setUserName ] = React.useState('');
  const [ userDescription, setUserDescription ] = React.useState('');
  const [ userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData()
    .then(userData => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
    })  
  }, []);

  React.useEffect(() => {
    api.getAllCards()
    .then(data => {
      setCards(data.map((item) => ({
        id: item._id,
        link: item.link,
        name: item.name
      })))
    })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content"> 
          <div className="profile__avatar-container">  
            <div 
              className="profile__image" 
              style={{ backgroundImage: `url(${userAvatar})` }} 
              alt={`Изображение ${userName}`}>
            </div>
            <button className="button button_action_update-avatar" onClick={onEditAvatar}></button>
          </div>
          <div className="profile__info">                       
            <h1 className="profile__name">{userName}</h1>
            <button className="button button_action_edit" onClick={onEditProfile} type="button" 
              aria-label="Открыть форму редактирования"></button>                      
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>

        <button className="button button_action_add" onClick={onAddPlace} 
          type="button" aria-label="Добавить информацию"></button>
      </section>

      <section className="cards-grid">
        <ul className="cards-grid__list">
          {
            cards.map(({ id, ...props}) => <Card key={id} {...props} onCardClick={onCardClick}/>)
          }
        </ul>
      </section>      
    </main>
  )
}

export default Main;