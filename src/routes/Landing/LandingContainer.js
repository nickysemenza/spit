import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboardActions';
import { createUser, logout } from '../../actions/userActions';
import { joinLobbyGame } from '../../actions/gameActions';
import Landing from './Landing';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToLeaderboard: () => {
    ownProps.routerProps.router.push("/leaderboard");
  },
  loadLeaderboard: () => {
    dispatch(fetchLeaderboard());
  },
  logout: () => {
    console.log("hi");
    dispatch(logout());
  },
  createUser: (username) => {
    dispatch(createUser(username));
  },
  joinLobbyGame: () => {
    dispatch(joinLobbyGame());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
