import {
  CREATED_USER,
  LOGOUT
} from '../actions/userActions';

const INITIAL_STATE = {
  authenticated: false,
  attempted_auth: false,
  token: null,
  id: null,
  lastUpdated: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATED_USER:
      return {
        ...state,
        id: action.data.id,
        token: action.data.token,
        username: action.data.username,
        authenticated: true,
        attempted_auth: true
      };
    case LOGOUT:
      return INITIAL_STATE;
    default:    
      return {
        ...state,
        attempted_auth: true
      };
  }
}
