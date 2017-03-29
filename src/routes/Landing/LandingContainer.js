import { connect } from 'react-redux';
import { fetchLeaderboard } from '../../actions/leaderboardActions';
import { createUser, logout } from '../../actions/userActions';
import { joinLobbyGame } from '../../actions/gameActions';
import Landing from './Landing';
import shortid from 'shortid';

function mapStateToProps (state) {
  return {
    leaderboard: state.leaderboard,
    user: state.user,
    lobby: state
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  goToLeaderboard: () => {
    ownProps.routerProps.router.push("/leaderboard");
  },
  goToInstructions: () => {
    ownProps.routerProps.router.push("/Instructions");
  },
  goToLanding: () => {
    ownProps.routerProps.router.push("/");
  },
  loadLeaderboard: () => {
    dispatch(fetchLeaderboard());
  },
  logout: () => {
    dispatch(logout());
  },
  createUser: (username) => {
    dispatch(createUser(username));
  },
  joinLobbyGame: () => {
    //dispatch(joinLobbyGame());
    dispatch(joinLobbyGame()).then((result) => {
      ownProps.routerProps.router.push("/game/"+result.lobby);
    });
  },
  createRandomLobby: () => {
    //ownProps.routerProps.router.push("/game/"+shortid.generate());
    dispatch(joinLobbyGame()).then((result) => {
      ownProps.routerProps.router.push("/game/"+result.clobby);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
