import { API_BASE_URL } from '../config';

export const CREATED_USER = 'CREATED_USER';

export function createUser (username) {
  return (dispatch) => {
    let f = new FormData();
    f.append('username',username);
    return fetch(`${API_BASE_URL}/users/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          username
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => response.json())
      .then((json) => dispatch(createdUser(json)));
  };
}

function createdUser (json) {
  return {
    type: CREATED_USER,
    data: json,
    receivedAt: Date.now()
  };
}

export const LOGOUT = 'LOGOUT';
export function logout () {
  return {
    type: LOGOUT,
    receivedAt: Date.now()
  };
}
