function Main () {

  const handleEditProfileClick = () => {
    document.querySelector('.popup_edit').classList.add('popup_opened');
  };

  const handleEditAvatarClick = () => {
    document.querySelector('.popup_update-avatar').classList.add('popup_opened');
  };

  const handleAddPlaceClick = () => {
    document.querySelector('.popup_add').classList.add('popup_opened');
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content"> 
          <div className="profile__avatar-container">  
            <image className="profile__image" src="" alt=""></image>
            <button className="button button_action_update-avatar" onClick={handleEditAvatarClick}></button>
          </div>
          <div className="profile__info">                       
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button className="button button_action_edit" onClick={handleEditProfileClick} type="button" 
              aria-label="Открыть форму редактирования"></button>                      
            <p className="profile__job"></p>
          </div>
        </div>

        <button className="button button_action_add" onClick={handleAddPlaceClick} 
          type="button" aria-label="Добавить информацию"></button>
      </section>

      <section className="cards-grid">
        <ul className="cards-grid__list">
        </ul>
      </section>      
    </main>
  )
}

export default Main;