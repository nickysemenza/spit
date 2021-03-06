import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
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
    let ranking = this.props.leaderboard ? this.props.leaderboard.ranking : [];
    if(ranking==undefined || Object.keys(ranking).length == 0)
      ranking=[];
    let rank = 1;
    let list = ranking.map(row=><tr key={row.username}>
      <td>{rank++}</td>
      <td>{row.username}</td>
      <td>{row.gamesWon}</td>
      <td>{row.gamesPlayed - row.gamesWon}</td>
      <td>{row.totalScore}</td>

    </tr>);
    return (
      <div>

        <img className="leftBanner" src="../../assets/Sidebar.png" />
        <img className="rightBanner" src="../../assets/Sidebar.png" />
        <div className="flex-leaderboard">
          <div className="infoContain">
            <h1>Leaderboard</h1>
            <table>
              <tbody className="leaderboard flex-vertical">
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>W</th>
                <th>L</th>
                <th>Score</th>
              </tr>
              {list}
              </tbody>
            </table>
            <a href="/"><button className="homepageBttn">Home</button></a>
          </div>
        </div>

      </div>
    );


  }
}
