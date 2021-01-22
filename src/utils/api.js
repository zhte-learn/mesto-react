class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _handleResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }
  
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  updateUserData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  addLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) => {
      console.log(res)
      return this._handleResult(res);
    })
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }

  changeLikeCardStatus(id, isLiked) {
    if(isLiked) {
      return this.addLike(id);
    } else {
      return this.deleteLike(id);
    }
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res) => {
      return this._handleResult(res);
    })
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: '87c4662d-efe2-4049-bb5c-28aff5c45986',
    'content-type': 'application/json'
  }
});

export default api;