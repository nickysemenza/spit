import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {SOCKET_ADDRESS} from '../../config';
import Card from './Card';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveBox: ""
    };
    this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    this.sendMoveDebug = this.sendMoveDebug.bind(this);
    this.startGame = this.startGame.bind(this);
  }
  handleMoveBoxChange(event) {
    this.setState({moveBox: event.target.value});
  }
  sendMoveDebug() {
    let move = this.state.moveBox;
    this.sendMove(move);
  }
  startGame() {
    this.sendMove("START-GAME "+this.props.game_id);
  }
  sendMove(move) {
    console.log("SENDING CMD",move);
    this.websocket.send(move);
  }
  componentDidMount () {
    this.websocket = new WebSocket(`ws://${SOCKET_ADDRESS}`);
    this.websocket.onmessage = (event) => {
      let split = event.data.split(" ");
      if(split[0]=="GAME-STATE") {
        let data = JSON.parse(split[1]);
        console.log(data);
        this.props.receiveGameState(data);
      }
      else if(split[0]=="AUTH-OK")
        this.websocket.send('JOIN-GAME '+this.props.game_id);
      else
        console.log(event.data);
    };
    this.websocket.onopen = () => {
      this.websocket.send('AUTH '+this.props.user.token);
    };
  }
  render () {
    return (<div>
        <h1>Game #{this.props.game_id}</h1>

        <input type="text" value={this.state.moveBox} onChange={this.handleMoveBoxChange} />
        <button onClick={this.sendMoveDebug}>send move</button>
        <button onClick={this.startGame}>start game</button>

        <Card type={1} />
        <pre>{JSON.stringify(this.props.game.state, null, 2)}</pre>
    </div>
    );
  }
}
