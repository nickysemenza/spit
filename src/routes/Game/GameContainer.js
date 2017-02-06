import { connect } from 'react-redux';
import {receiveGameState } from '../../actions/gameActions';

import Game from './Game';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard,
    game: state.game
  };
}

const mapDispatchToProps = (dispatch) => ({
  receiveGameState: (json) => {
    dispatch(receiveGameState(json));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
