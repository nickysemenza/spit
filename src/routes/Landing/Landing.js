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

    return (<div>
      <div className="landingContain">
        <h2 className="titleText" margin="0px">-----   Spit   -----</h2>
        <h2 className="funText" >\(^_^)/    \(^_^)/</h2>
        </div>
        <div className="landingContain">
          <h2 className="headText" >Nickname</h2>

          <input type="text" className="nickNameText" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
          <div className="lbuttonFlex">
            <button className="lobby1Text" onClick={this.registerUser}>Rando Lobby</button>
            <button className="lobby2Text" onClick={this.registerUser}>Play with friends Lobby</button>

            </div>
            <button className="leaderboardText" onClick={this.registerUser}>leaderboard</button>
            <button className="leaderboardText" onClick={this.joinRandomGame}>joinRandomGame</button>
          </div>
    </div>
    );
  }
}
