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

    return (<div>
      <h2 className="titleText" >\(^__^)/ \(^_^)/</h2>
      <h2 className="titleText" margin="0px">-----Spit-----</h2>
      <h2 className="funText" >\(^__^)/ \(^_^)/</h2>

        <h2 className="headText" >Nickname</h2>
        <input type="text" className="nickNameText" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
        <button className="userNameText" onClick={this.registerUser}>register?</button>

        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
        <hr/>
        <button onClick={this.props.loadLeaderboard}>Reload leaderboard from backend</button>
        <button onClick={()=>{this.props.createUser("aa");}}>test</button>
    </div>
    );
  }
}
