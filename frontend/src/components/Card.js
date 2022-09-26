import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner.i === currentUser.i;
  
  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__remove' : 'elements__remove_hidden'}`
  ); 

  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked  && 'elements__like_active'}`
  )

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeCard() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <li className="elements__item">
      <img
        className="elements__image"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="elements__info">
        <h3 className="elements__title">{props.card.name}</h3>
        <div>
          <button type="click" className={cardLikeButtonClassName} onClick={handleLikeCard}></button>
          <p className="elements__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
