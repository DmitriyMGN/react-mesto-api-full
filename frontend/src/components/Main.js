import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <a
          href="##"
          className="profile__avatar"
          onClick={props.onEditAvatar}
          style={{ backgroundImage: `url(${currentUser?.avatar})` }}
        ></a>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            type="button"
            className="profile__edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__activity">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((item) => {
            return (
              <Card
                card={item}
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
