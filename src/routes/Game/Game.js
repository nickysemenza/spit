import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
export default class Game extends Component {
  componentDidMount () {
    // this.props.loadData();
  }
  render () {

    return (<div>
        <Grid>
          <Row className="show-grid">
            <Col lg={6} md={6}>
              this is a game page
              <pre>game_id is {this.props.game_id}, as from the url bar</pre>
            </Col>
            <Col lg={6} md={6}>test</Col>
          </Row>
        </Grid>
    </div>
    );
  }
}
