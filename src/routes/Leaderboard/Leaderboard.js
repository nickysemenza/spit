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
    let ranking = this.props.leaderboard ? this.props.leaderboard.ranking : [];
    if(ranking==undefined)
      ranking=[];
    var rank = 1;
    let list = ranking.map(row=><tr key={row.username}>
      <td>{rank++}</td>
      <td>{row.username}</td>
      <td>{row.win}</td>
      <td>{row.loss}</td>

    </tr>);
    return (
      <div>

        <img className="leftBanner" src="../../assets/Sidebar.png" />
        <img className="rightBanner" src="../../assets/Sidebar.png" />
        <div className="flex-leaderboard">
          <div>
            <h1>Leaderboard</h1>
            <table className="leaderboard flex-vertical">
              <tr>
                <th></th>
                <th>ID</th>
                <th>W</th>
                <th>L</th>
              </tr>
              {list}
            </table>
          </div>
        </div>
      </div>
    );


  }
}