import {
  RECEIVE_GAME_STATE,
} from '../actions/gameActions';

const INITIAL_STATE = { state: {}, lastUpdated: null};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.number) {

    case RECEIVE_GAME_STATE:
      return { ...state,
        state: action.state,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}
