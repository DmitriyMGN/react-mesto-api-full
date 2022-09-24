import mestoLogo from '../images/header__logo.svg';
import { useLocation, Link} from 'react-router-dom';

function Header (props) {

  const location = useLocation()
  return (
  <header className="header">
    <img src={mestoLogo} alt="Картинка логотипа Место" className="header__logo" />
    <div className="navbar">
      {location.pathname === '/sign-in' && <Link className="navbar__element" to="/sign-up">Регистрация</Link> }
      {location.pathname === '/sign-up' && <Link className="navbar__element" to="/sign-in">Войти</Link> }
      {location.pathname === '/' && <p className="navbar__element">{props.email}</p> }
      {location.pathname === '/' && <button onClick={props.signOut} className="navbar__element navbar__element_type_button">Выйти</button> }
    </div>
  </header>
  )
}

export default Header;