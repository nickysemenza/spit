/**
 * Created by Rashon on 2/7/2017.
 */
import React, { Component, PropTypes } from 'react';
import Leaderboard from '../../components/Leaderboard';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: "0"
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  componentDidMount () {
    this.props.loadLeaderboard();
  }
  handleUsernameChange(event) {
    this.setState({usernameBox: event.target.value});
  }
  registerUser() {
    let username = this.state.usernameBox;
    this.props.createUser(username);
  }
  render () {

    return (
	<div >
	<p2> Spit.io </p2>
	<button> Play Now</button> 
	<button> Leaderboard</button>  
	</div>
    );
  }
}
