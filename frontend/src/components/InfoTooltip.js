import imgFail from '../images/fail.svg'
import imgSuccess from '../images/success.svg'

function InfoToolTip (props) {
  return (
    <div className={`
    popup 
    ${props.status ? "popup_sucess" : "popup_fail"}
    ${props.isOpen ? "popup_open" : ""}
    `}
    >
      <div className="popup__content popup__content_reg-status">
        <button type="button" className="popup__cross" onClick={props.onClose}></button>
        <img className="popup__status-image" 
        alt="Картинка статуса входа" 
        src={props.loggedIn ? `${imgSuccess}` : `${imgFail}` } />
        <p className="popup__title popup__title_reg-status">{props.loggedIn ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
      </div>
    </div>
  )
}

export default InfoToolTip;

