import React, { Component, PropTypes } from 'react';
import Leaderboard from '../../components/Leaderboard';
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: ""
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({usernameBox: event.target.value});
  }
  registerUser() {
    let username = this.state.usernameBox;
    this.props.createUser(username);
  }
  componentDidMount () {
    this.props.loadLeaderboard();
  }

  render () {

    return (<div>
        <h2>User</h2>

        <input type="text" value={this.state.usernameBox} onChange={this.handleUsernameChange} />
        <button onClick={this.registerUser}>register?</button>


        <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
        <hr/>
        <button onClick={this.props.loadLeaderboard}>Reload leaderboard from backend</button>
        <button onClick={()=>{this.props.createUser("aa")}}>test</button>
        <Leaderboard leaderboard={this.props.leaderboard}/>


        {/*<pre>{JSON.stringify(this.props, null, 2)}</pre>*/}
    </div>
    );
  }
}
