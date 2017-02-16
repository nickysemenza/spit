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

          <img src="../../assets/logo.png" className="logoIMG" alt="SpitON.US Logo"></img>
        </div>
        <div className="landingContain">
        
          <input type="text" className="usernameInput" placeholder="Enter Username" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
          <button className="playNowBttn" onClick={this.registerUser}>Play Now</button>
          <button className="newLobbyBttn" onClick={this.registerUser}>New Lobby</button>
            
            
            <button className="leaderboardBttn" onClick={this.registerUser}>leaderboard</button>
        </div>
      </div>
    );
  }
}
