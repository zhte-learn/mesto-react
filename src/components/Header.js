import logo from '../images/logo.svg';

function Header () {
  return (
    <header className="header">
      <div className="header__container">
        <a className="header__link" href="https://yandex.ru/">
          <img className="logo" src={logo} alt="Логотип Mesto" />
        </a>
      </div>
    </header>
  )
}

export default Header;