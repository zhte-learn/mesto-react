function Card (props) {
  
  function handleClick () {
    props.onCardClick(props);
  }

  return (
    <li className="cards-grid__item">
      <button className="button button_action_remove" type="button" aria-label="Удалить карточку"></button>
      <figure className="cards-grid__figure">             
        <div className="cards-grid__image-wrapper">
          <img className="cards-grid__image" src={props.link} alt={`Изображение ${props.name}`}onClick={handleClick}/>
        </div>
                                      
        <figcaption className="cards-grid__caption">
          <h2 className="cards-grid__caption-title">{props.name}</h2>
          <div className="cards-grid__like-container">
            <button className="button button_action_like" type="button" aria-label="Поставить лайк"></button>
            <span className="cards-grid__likes-counter">{props.likes.length}</span>
          </div>
        </figcaption>
      </figure>  
    </li>
  )
}

export default Card;