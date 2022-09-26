import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useState, useEffect, useContext } from "react";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });

  }

  
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__position-container">
        <input
          required
          minLength="2"
          maxLength="40"
          type="text"
          id="person"
          name="person"
          placeholder="Имя"
          className="popup__input popup__input_place_name"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__error person-error"></span>
      </div>
      <div className="popup__position-container">
        <input
          required
          minLength="2"
          maxLength="200"
          type="text"
          id="job"
          name="job"
          placeholder="Профессиональная деятельность"
          className="popup__input popup__input_place_activity"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__error job-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
