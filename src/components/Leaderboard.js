import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
export default class Leaderboard extends Component {
  render () {

    let ranking = this.props.leaderboard.ranking;
    let list = Object.keys(ranking).map(key=><li key={key}>{key} - {ranking[key]}</li>);
    return (<div style={{background: "grey"}}>
        <h3>leaderboard</h3>
        <ul>{list}</ul>
        {/*<pre>{JSON.stringify(this.props.leaderboard, null, 2)}</pre>*/}
      </div>
    );
  }
}
