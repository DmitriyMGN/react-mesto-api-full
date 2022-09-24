function PopupWithForm (props) {

  return (
    <div className={`
    popup 
    popup_place_${props.name}
    ${props.isOpen ? "popup_open" : ""}
    `}
    >
      <div className="popup__content">
        <h2 className={`popup__title popup__title_place_${props.name}`}>{props.title}</h2>
        <button type="button" className="popup__cross" onClick={props.onClose}></button>
        <form action="#" name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;