import React, { Component, PropTypes } from 'react';
import Leaderboard from '../../components/Leaderboard';
export default class Dashboard extends Component {
  componentDidMount () {
    this.props.loadLeaderboard();
  }

  render () {

    return (<div>
        <h2>User</h2>
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
