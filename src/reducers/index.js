import { combineReducers } from 'redux';
import leaderboard from './leaderboardReducer';
import game from './gameReducer';
import user from './userReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  leaderboard,
  game,
  user,
  routing: routerReducer
});

export default rootReducer;
