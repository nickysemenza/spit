import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import GamePage from './routes/Game/GamePage';
import LandingPage from './routes/Landing/LandingPage';
import Instructions from './routes/Landing/Instructions';
import LeaderboardPage from './routes/Leaderboard/LeaderboardPage';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage}/>
    <Route path="leaderboard" component={LeaderboardPage}/>
    <Route path="Instructions" component={Instructions}/>
    <Route path="game/:game_id" component={GamePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
