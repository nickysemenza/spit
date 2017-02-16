import React, { Component, PropTypes } from 'react';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: ""
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
      <div>

        <div className="landingContain">
        <img src="../../assets/Logo.png" className="logoIMG"></img>
        </div>
        <div className="landingContain">

          <input type="text" className="nickNameText" placeholder="Enter Username" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
          <button className="lobby1Text" onClick={this.registerUser}>Play Now</button>
          <button className="lobby2Text" onClick={this.registerUser}>New Lobby</button>


            <button className="leaderboardText" onClick={this.registerUser}>leaderboard</button>
        </div>
      </div>
    );
  }
}
