import React, { Component, PropTypes } from 'react';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: "",
      attempt: false
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.joinRandomGame = this.joinRandomGame.bind(this);
    this.createLobby = this.createLobby.bind(this);
  }
  componentDidMount () {
    this.props.loadLeaderboard();
  }
  handleUsernameChange(event) {
    this.setState({usernameBox: event.target.value});
  }
  registerUser() {
    let username = this.state.usernameBox.replace(/\s+/g, '');
    if(username != '')
      this.props.createUser(username);
  }
  joinRandomGame() {
    this.props.joinLobbyGame();
  }
  createLobby(){
    //console.log("test");
    this.props.createRandomLobby();
  }

  render () {
    let {attempt} = this.state;

    return (
      <div>

        <div className="landingContain">

          <img src="../../assets/logo.png" className="logoIMG" alt="SpitON.US Logo" />

          {!this.props.user.authenticated ?
          <input type="text" className="usernameInput" placeholder="Enter Username" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
          : <h1>Hello, {this.props.user.username}</h1>

          }
          <h3>{this.props.user.error}</h3>

          {!this.props.user.authenticated ? <button className="playNowBttn" onClick={this.registerUser}>Register</button> : ''}
          {this.props.user.authenticated ? <button className="playNowBttn" disabled={!this.props.user.authenticated} onClick={this.joinRandomGame}>Play Now</button> : ''}
          {this.props.user.authenticated ? <button className="newLobbyBttn" disabled={!this.props.user.authenticated} onClick={this.createLobby}>New Lobby</button> : ''}


            <button className="homepageBttn lobbyBttn" onClick={this.props.goToLeaderboard}>leaderboard</button>
            <button className="homepageBttn instructionBttn" onClick={this.props.goToInstructions}>Instructions</button>

            {this.props.user.authenticated ? <button className="homepageBttn logoutBttn" onClick={this.props.logout}>Logout</button> : ''}
        </div>
      </div>
    );
  }
}
