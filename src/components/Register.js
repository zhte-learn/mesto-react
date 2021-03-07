import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import auth from '../utils/auth.js';


function Register (props) {
  console.log(props)
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const history = useHistory();
  
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password)
    .then((res) => {
      props.isRegisterSuccess(true);
      props.isInfoTooltipShow(true);
      history.push('/sign-in'); 
    })
    .catch(() => {
      props.isRegisterSuccess(false);
      props.isInfoTooltipShow(true);
    })
  } 

  return (
    <div className="sign">
      <h1 className="sign__header">Регистрация</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" onChange={handleChangeEmail}></input>
        <input type="password" placeholder="Пароль" onChange={handleChangePassword}></input>
        <button className="form__button form__button_white">Зарегистрироваться</button>
      </form>
      <p className="sign__text">Уже зарегистрированы? 
        <Link to="sign-in" className="sign__link">Войти</Link>
      </p>
    </div>
  )
}

export default Register;