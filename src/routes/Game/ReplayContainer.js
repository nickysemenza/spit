import { connect } from 'react-redux';
import { getReplay } from '../../actions/gameActions';

import Replay from './Replay';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard,
    game: state.game,
    user: state.user,
    replay: state.game.replay
  };
}

const mapDispatchToProps = (dispatch) => ({
  getReplay: (id) => {
    dispatch(getReplay(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Replay);
