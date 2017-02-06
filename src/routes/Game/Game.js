import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {SOCKET_ADDRESS} from '../../config';
import Card from './Card';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketLog: [],
      moveBox: ""
    };
    this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    this.sendMoveDebug = this.sendMoveDebug.bind(this);
  }
  handleMoveBoxChange(event) {
    this.setState({moveBox: event.target.value});
  }
  sendMoveDebug() {
    let move = this.state.moveBox;
    this.sendMove(move);
  }
  sendMove(move) {
    console.log("SENDING MOVE",move);
    this.websocket.send('MOVE '+move);
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
  render () {
    return (<div>
        <Grid>

          <input type="text" value={this.state.moveBox} onChange={this.handleMoveBoxChange} />
          <button onClick={this.sendMoveDebug}>send move</button>

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
