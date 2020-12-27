function ImagePopup () {
  return (
    <div className="popup popup_pic">
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="Закрыть попап"></button>
        <figure className="figure-pic">         
          <img className="figure-pic__image" alt="Изображение места" />
          <figcaption className="figure-pic__figcaption"></figcaption>
        </figure>
      </div>                                              
    </div>
  )
}

export default ImagePopup;