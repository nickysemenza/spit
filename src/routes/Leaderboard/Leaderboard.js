import React, { Component, PropTypes } from 'react';
export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameBox: ""
    };
  }
  componentDidMount () {
    this.props.loadLeaderboard();
  }

  render () {
    let ranking = this.props.leaderboard.ranking;
    let list = ranking.map(row=><tr>
      <td>{row.username}</td>
      <td>{row.win}</td>
      <td>{row.loss}</td>

    </tr>);
    return (<div>
        <h2>Leaderboard</h2>
        {/*<button onClick={this.props.loadLeaderboard}>Reload leaderboard from backend</button>*/}
        {/*<pre>{JSON.stringify(this.props.leaderboard, null, 2)}</pre>*/}
        <table>
          {list}
        </table>
      </div>
    );
  }
}
