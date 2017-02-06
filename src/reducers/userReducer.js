import {
  CREATED_USER,
} from '../actions/leaderboardActions';

const INITIAL_STATE = { user: {}, lastUpdated: null, loading: false };

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case CREATED_USER:
      return { ...state, loading: true };
    default:
      return state;
  }
}
