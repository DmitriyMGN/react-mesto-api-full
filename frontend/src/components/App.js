import Header from "./Header.js";
import Login from "./Login.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import InfoToolTip from "./InfoTooltip.js";
import api from "../utils/api.js";
import Auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedEmail, setLoggedEmail] = useState(null);
  const history = useHistory();

  const auth = new Auth();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    auth
      .authorize(password, email)
      .then(() => {
          setLoggedIn(true)
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitRegister(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    auth
      .register(password, email)
      .then(() => {
        handleLogin();
        handleInfoToolTip();
      })
      .catch(() => {
        setLoggedIn(false);
        handleInfoToolTip();
      });
  }

  function updateData(item) {
    const data = {
      name: item.name,
      about: item.about,
      avatar: item.avatar,
    };
    return data;
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        setLoggedEmail(userData.email);
        history.go("/");
      })
      .catch((err) => console.log(err));
  }, [loggedIn, history])

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((cardsArray) => {
          setCards(cardsArray);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);
  

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleInfoToolTip() {
    setIsInfoToolTipPopupOpen(!isInfoToolTipPopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(item) {
    api
      .setUserInfo(item)
      .then((item) => {
        setCurrentUser(updateData(item));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(item) {
    api
      .updateAvatar(item)
      .then((item) => {
        setCurrentUser(updateData(item));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(item) {
    api
      .setNewCard(item)
      .then((item) => {
        setCards([item, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    auth.signOut()
    .then(() => {
        setLoggedIn(false)
        history.push("/sign-in");
    })
    .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={signOut} email={loggedEmail} />
        <Switch>
          <Route path="/signin">
            <Login
              onLogin={handleSubmitLogin}
              email={email}
              password={password}
              handleChangeEmail={handleChangeEmail}
              handleChangePassword={handleChangePassword}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleSubmitRegister}
              email={email}
              password={password}
              handleChangeEmail={handleChangeEmail}
              handleChangePassword={handleChangePassword}
            />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route exact path="">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />
        <PopupWithForm name="card-delete" title="Вы уверены?" buttonText="Да" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
