import '../index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  return (
    <body className="page">      
      <Header />

      <div className="page__container">
        <Main />

        <Footer />
      </div>

      <PopupWithForm 
        title='Редактировать профиль'
        children={
          <>
          <input id="name-input" name="name" type="text" className="form__input form__input_text_name" 
            placeholder="Имя" minlength="2" maxlength="40" required />
          <span id="name-input-error" className="form__input-error"></span>

          <input id="about-input" name="about" type="text" className="form__input form__input_text_job" 
            placeholder="Род деятельности"minlength="2" maxlength="200" required />
          <span id="about-input-error" className="form__input-error"></span>
          </>
        }
        btnTitle='Сохранить'
        name='edit'
      />

      <PopupWithForm
        title='Новое место'
        children={
          <>
            <input id="name-input" name = "name" type="text" className="form__input form__input_text_place" 
              placeholder="Название" minlength="1" maxlength="30" required />
            <span id="name-input-error" className="form__input-error"></span>

            <input id="url-input" name = "link" type="url" className="form__input form__input_text_link" 
              placeholder="Ссылка на картинку" required />
            <span id="url-input-error" className="form__input-error"></span>  
          </>
        }
        btnTitle='Создать'
        name='add'
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
      />

      <PopupWithForm
        title='Вы уверены?'
        btnTitle='Да'
        name='confirm'
      />

      <ImagePopup />

    </body>
  );
}

export default App;