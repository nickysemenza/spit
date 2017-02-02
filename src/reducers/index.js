import { combineReducers } from 'redux';
import leaderboard from './leaderboardReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  leaderboard,
  routing: routerReducer
});

export default rootReducer;
