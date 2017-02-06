import { API_BASE_URL } from '../config';

export const CREATED_USER = 'CREATED_USER';

export function createUser () {
  return (dispatch) => {
    return fetch(`${API_BASE_URL}/createuser`)
      .then((response) => response.json())
      .then((json) => dispatch(createdUser(json)));
  };
}


function createdUser (json) {
  if ('error' in json) {
    json = null;
  }
  return {
    type: CREATED_USER,
    leaderboard: json,
    receivedAt: Date.now()
  };
}
