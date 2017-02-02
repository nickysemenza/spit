import React, { Component, PropTypes } from 'react';
import Leaderboard from '../../components/Leaderboard';
export default class Dashboard extends Component {
  componentDidMount () {
    this.props.loadLeaderboard();
  }
  render () {

    return (<div>
        landing page yay
        <button onClick={this.props.loadLeaderboard}>Reload leaderboard from backend</button>
        <Leaderboard leaderboard={this.props.leaderboard}/>


        {/*<pre>{JSON.stringify(this.props, null, 2)}</pre>*/}
    </div>
    );
  }
}
