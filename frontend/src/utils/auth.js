import baseUrl from "./utils.js"
class Auth {

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(password, email) {
    return fetch(`${baseUrl}/signup`, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      })
      .then(this._checkResponse)
  }

  authorize(password, email) {
    return fetch(`${baseUrl}/signin`, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email,
        }),
      })
      .then(this._checkResponse)
  }

  signOut() {
    return fetch(`${baseUrl}/signout`, {
      credentials: 'include',
      method: 'GET',
    }).then((this._checkResponse));
  }
}

export default Auth
