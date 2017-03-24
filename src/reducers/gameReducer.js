import {
  RECEIVE_GAME_STATE,
  RECEIVE_REPLAY
} from '../actions/gameActions';

const INITIAL_STATE = { state: {}, lastUpdated: null, replay: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {

    case RECEIVE_GAME_STATE:
      return { ...state,
        state: action.state,
        lastUpdated: action.receivedAt
      };
    case RECEIVE_REPLAY:
      console.log(action);
      return {...state,
        replay: action.replay
      };
    default:
      return state;
  }
}
