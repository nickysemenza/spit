import React, { Component, PropTypes } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketLog: []
    };
  }
  componentDidMount () {
    // this.props.loadData()
    let self = this;
    let url = "localhost:8080";//+"/"+this.props.params.game_id;
    this.websocket = new WebSocket(`ws://${url}`);
    // this.dispatcher = dispatcher
    this.websocket.onmessage = (event) => {
      let split = event.data.split(" ");
      if(split[0]=="GAME-STATE") {
        let data = JSON.parse(split[1]);
        console.log(data);
        this.props.receiveGameState(data);
      }
      else
        console.log(event.data);
      this.state.socketLog.push(event);
    };
    this.websocket.onopen = () => {
      this.websocket.send('AUTH test');
      this.websocket.send('JOIN-GAME '+this.props.game_id);
    };
  }
  render () {
    return (<div>
        <Grid>
          <Row className="show-grid">
            <Col lg={6} md={6}>
              this is a game page
              <pre>game_id is {this.props.game_id}, as from the url bar</pre>
            </Col>
            <Col lg={6} md={6}>
              log: {this.state.socketLog.length}
              <pre>{JSON.stringify(this.props.game, null, 2)}</pre>
              {/*<ul>{log}</ul>*/}
            </Col>
          </Row>
        </Grid>
    </div>
    );
  }
}
