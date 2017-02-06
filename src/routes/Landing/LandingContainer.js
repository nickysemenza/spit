import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboardActions';
import Landing from './Landing';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => ({
  loadLeaderboard: () => {
    dispatch(fetchLeaderboard());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
