class Api {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include'
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include'
    }).then(this._checkResponse);
  }
  
setUserInfo(item) {
  return fetch(`${this._url}/users/me`, {
    credentials: 'include',
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.name,
      about: item.about,
    }),
  }).then(this._checkResponse);
}

  setNewCard(item) {
    return fetch(`${this._url}/cards`,{
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      credentials: 'include',
      method: "DELETE",
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._url}/cards/${cardId}/likes`,{
      credentials: 'include',
      method: like ? "PUT" : "DELETE",
    }).then(this._checkResponse);
  }

  updateAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then(this._checkResponse);
  }
}

export default new Api("https://api.dmitriymgn.nomoredomains.club");
