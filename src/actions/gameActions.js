import { API_BASE_URL } from '../config';
import { push } from 'react-router-redux';

export const RECEIVE_GAME_STATE = 'RECEIVE_GAME_STATE';

export function receiveGameState (json) {
  //console.log(json);
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
  //console.log(json.game_id);
  // dispatch(push("/hi"));
  //return (dispatch) => {
  //  dispatch(push("/hi"));
  //};

  return {
    type: RECEIVE_JOIN_LOBBY_GAME,
    //leaderboard: json,
    lobby:json.game_id,
    clobby:json.custom_id,
    receivedAt: Date.now()
  };
}


export const REQUEST_REPLAY = 'REQUEST_REPLAY';
export const RECEIVE_REPLAY = 'RECEIVE_REPLAY';

export function getReplay (id) {
  return (dispatch) => {
    dispatch(requestReplay());
    return fetch(`${API_BASE_URL}/replay/${id}`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveReplay(json)));
  };
}

function requestReplay () {
  return {
    type: REQUEST_REPLAY
  };
}

function receiveReplay (json) {
  return {
    type: RECEIVE_REPLAY,
    replay: json,
    receivedAt: Date.now()
  };
}
