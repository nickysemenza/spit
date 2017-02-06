import { API_BASE_URL } from '../config';

export const REQUEST_LEADERBOARD = 'REQUEST_LEADERBOARD';
export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';

export function fetchLeaderboard () {
  return (dispatch) => {
    dispatch(requestLeaderboard());
    return fetch(`${API_BASE_URL}/leaderboard`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveLeaderboard(json)));
  };
}

function requestLeaderboard () {
  return {
    type: REQUEST_LEADERBOARD
  };
}

function receiveLeaderboard (json) {
  if ('error' in json) {
    json = null;
  }
  return {
    type: RECEIVE_LEADERBOARD,
    leaderboard: json,
    receivedAt: Date.now()
  };
}
