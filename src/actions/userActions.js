// import { API_BASE_URL } from 'config';

const API_BASE_URL = 'http://localhost:3004';
export const REQUEST_LEADERBOARD = 'REQUEST_LEADERBOARD';
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';

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
    type: RECEIVE_LEADERBOARD,
    leaderboard: json,
    receivedAt: Date.now()
  };
}
