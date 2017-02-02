import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboardActions';
import Game from './Game';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard
  };
}

const mapDispatchToProps = (dispatch) => ({
  // loadLeaderboard: () => {
  //   dispatch(fetchLeaderboard());
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
