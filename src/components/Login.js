import React from 'react';
import { useHistory } from 'react-router-dom';
import auth from '../utils/auth';

function Login (props) {
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

    auth.authorize(email, password)
    .then(() => {
      props.setIsLoggedIn(true);
      history.push('/');
    })
    .catch(() => {
      props.isRegisterSuccess(false);
      props.isInfoTooltipShow(true);
    })
  } 

  return (
    <div className="sign">
      <h1 className="sign__header">Вход</h1>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" onChange={handleChangeEmail}></input>
        <input type="password" placeholder="Пароль" onChange={handleChangePassword}></input>
        <button className="form__button form__button_white">Войти</button>
      </form>
    </div>
  )
}

export default Login;
