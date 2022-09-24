import PopupWithForm from "./PopupWithForm.js";
import { useRef, useEffect } from "react";

function AddPlacePopup(props) {

  const nameRef = useRef(); 
  const linkRef = useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateCards({
      name: nameRef.current.value,
      link: linkRef.current.value
    });
  } 

  useEffect(() => {
    nameRef.current.value = ''
    linkRef.current.value = ''
}, [props.isOpen]);



  return (
    <PopupWithForm
    name="card"
    title="Новое место"
    buttonText="Создать"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
  >
    <div className="popup__position-container">
      <input
        required
        minLength="2"
        maxLength="30"
        type="text"
        id="name"
        name="name"
        placeholder="Название"
        className="popup__input popup__input_place_card-name"
        ref={nameRef}
      />
      <span className="popup__error name-error"></span>
    </div>
    <div className="popup__position-container">
      <input
        required
        type="url"
        id="link"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_place_card-link"
        ref={linkRef}
      />
      <span className="popup__error link-error"></span>
    </div>
  </PopupWithForm>
  )
}

export default AddPlacePopup;
