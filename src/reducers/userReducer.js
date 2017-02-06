import {
  REQUEST_LEADERBOARD,
  RECEIVE_LEADERBOARD,
} from '../actions/leaderboardActions';

const INITIAL_STATE = { ranking: {}, lastUpdated: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case REQUEST_LEADERBOARD:
      return { ...state, loading: true };
    case RECEIVE_LEADERBOARD:
      return { ...state,
        loading: false,
        ranking: action.leaderboard,
        lastUpdated: action.receivedAt
      };
    default:
      return state;
  }
}
