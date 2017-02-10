import {
  CREATED_USER,
} from '../actions/userActions';

const INITIAL_STATE = {
  authenticated: false,
  token: null,
  id: null,
  lastUpdated: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.number) {
    case CREATED_USER:
      return {
        ...state,
        id: action.data.id,
        token: action.data.token,
        username: action.data.username,
        authenticated: true
      };
    default:
      return state;
  }
}
