import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import {SOCKET_ADDRESS} from '../../config';
import Card from './Card';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveBox: "",
      selectedHand: null
    };
    this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    this.sendMoveDebug = this.sendMoveDebug.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeSelectedHand = this.changeSelectedHand.bind(this);
    this.popDeck = this.popDeck.bind(this);
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
  changeSelectedHand(ind) {
    this.setState({selectedHand: ind});
  }
  popDeck() {
    this.sendMove("MOVE POP-DECK");
  }

  render () {
    return (<div>
        <h1>Game #{this.props.game_id}</h1>
        <h2>Hello, {this.props.user.username}</h2>

        <KeyHandler keyEventName={KEYPRESS} keyValue="1" onKeyHandle={()=>{this.changeSelectedHand(1);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="2" onKeyHandle={()=>{this.changeSelectedHand(2);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="3" onKeyHandle={()=>{this.changeSelectedHand(3);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="4" onKeyHandle={()=>{this.changeSelectedHand(4);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.popDeck} />


        <input type="text" value={this.state.moveBox} onChange={this.handleMoveBoxChange} />
        <button onClick={this.sendMoveDebug}>send move</button>
        <button onClick={this.startGame}>start game</button>

        {/*<Card type={1} />*/}
        <pre>Currently selected hand index (from numkeys): {this.state.selectedHand}</pre>
        <pre>{JSON.stringify(this.props.game.state, null, 2)}</pre>
    </div>
    );
  }
}
