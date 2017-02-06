import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {SOCKET_ADDRESS} from '../../config';
import Card from './Card';

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
    this.websocket = new WebSocket(`ws://${SOCKET_ADDRESS}`);
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
  sendMove(move) {
    this.websocket.send('MOVE '+move);
  }
  render () {
    return (<div>
        <Grid>

          <Card type={1} />


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
