import PopupWithForm from "./PopupWithForm.js";
import { useRef } from "react";

function EditAvatarPopup(props) {

  const avatarRef = useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 


  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__position-container">
        <input
          required
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_place_card-link"
          ref={avatarRef}
        />
        <span className="popup__error avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
