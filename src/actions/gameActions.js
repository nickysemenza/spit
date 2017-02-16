import { API_BASE_URL } from '../config';
import { push } from 'react-router-redux'

export const RECEIVE_GAME_STATE = 'RECEIVE_GAME_STATE';

export function receiveGameState (json) {
  return {
    type: RECEIVE_GAME_STATE,
    state: json,
    receivedAt: Date.now()
  };
}

export const REQUEST_JOIN_LOBBY_GAME = 'REQUEST_JOIN_LOBBY_GAME';
export const RECEIVE_JOIN_LOBBY_GAME = 'RECEIVE_JOIN_LOBBY_GAME';

export function joinLobbyGame () {
  return (dispatch) => {
    dispatch(requestJoinLobbyGame());
    return fetch(`${API_BASE_URL}/lobbymatch`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveJoinLobbyGame(json)));
  };
}

function requestJoinLobbyGame () {
  return {
    type: REQUEST_JOIN_LOBBY_GAME
  };
}

function receiveJoinLobbyGame (json) {
  console.log(json.game_id);
  // dispatch(push("/hi"));
  return (dispatch) => {
    dispatch(push("/hi"));
  };
  // return {
  //   type: RECEIVE_JOIN_LOBBY_GAME,
  //   leaderboard: json,
  //   receivedAt: Date.now()
  // };
}
