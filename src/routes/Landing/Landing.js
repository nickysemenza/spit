import React, { Component, PropTypes } from 'react';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.joinRandomGame = this.joinRandomGame.bind(this);
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
  joinRandomGame() {
    this.props.joinLobbyGame();
  }

  render () {

    return (
      <div>

        <div className="landingContain">

          <img src="../../assets/logo.png" className="logoIMG" alt="SpitON.US Logo" />
        </div>
        <div className="landingContain">

          {this.props.user.authenticated ? 
          <input type="text" className="usernameInput" placeholder="Enter Username" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
          : <h1>Hello, {this.props.user.username}</h1>
          
          }
          {!this.props.user.authenticated ? <button className="playNowBttn" onClick={this.registerUser}>Register</button> : ''}
          {this.props.user.authenticated ? <button className="playNowBttn" disabled={!this.props.user.authenticated} onClick={this.joinRandomGame}>Play Now</button> : ''}
          {this.props.user.authenticated ? <button className="newLobbyBttn" disabled={!this.props.user.authenticated} onClick={this.joinRandomGame}>New Lobby</button> : ''}


            <button className="leaderboardBttn" onClick={this.props.goToLeaderboard}>leaderboard</button>
        </div>
      </div>
    );
  }
}
