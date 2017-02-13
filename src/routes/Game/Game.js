import React, { Component, PropTypes } from 'react';
import {SOCKET_ADDRESS} from '../../config';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Opponents from './Opponents';
import Piles from './Piles';
import PlayerSection from './PlayerSection';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveBox: "",
      selectedHand: null
    };
    this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    this.sendCommandDebug = this.sendCommandDebug.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeSelectedHand = this.changeSelectedHand.bind(this);
    this.popDeck = this.popDeck.bind(this);
    this.placeCardOnPile = this.placeCardOnPile.bind(this);
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
  sendCommandDebug() {
    let move = this.state.moveBox;
    this.sendCommand(move);
  }
  startGame() {
    this.sendCommand("START-GAME "+this.props.game_id);
  }
  sendCommand(move) {
    console.log("SENDING CMD: ",move);
    this.websocket.send(move);
  }
  changeSelectedHand(ind) {
    this.setState({selectedHand: ind});
  }
  placeCardOnPile(whichPile) {
    //the number keys are 1 indexed, but our data is 0 indexed.
    this.sendCommand(`MOVE PLAY-CARD ${this.state.selectedHand-1} ${whichPile}`);
  }
  popDeck() {
    this.sendCommand("MOVE POP-DECK");
  }
  // clickedPile(aa) {
  //   console.log(aa);
  // }

  render () {
    let handCard;
    handCard = [[0],[0],[0],[0]];
    if(this.props.game.state.started)
      handCard = this.props.game.state.hand;
    return (<div>
        <h2>Game #{this.props.game_id}. Hello, {this.props.user.username}</h2>

        <KeyHandler keyEventName={KEYPRESS} keyValue="1" onKeyHandle={()=>{this.changeSelectedHand(1);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="2" onKeyHandle={()=>{this.changeSelectedHand(2);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="3" onKeyHandle={()=>{this.changeSelectedHand(3);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="4" onKeyHandle={()=>{this.changeSelectedHand(4);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.popDeck} />


        <input type="text" value={this.state.moveBox} onChange={this.handleMoveBoxChange} />
        <button onClick={this.sendCommandDebug}>send command</button>
        <button onClick={this.startGame}>start game</button>



        <Opponents/>
        <Piles piles={this.props.game.state.peekPiles} clickedPile={this.placeCardOnPile}/>
        <PlayerSection card1={handCard[0]}
                       card2={handCard[1]}
                       card3={handCard[2]}
                       card4={handCard[3]}
                       decks={this.props.game && this.props.game.state.decks ? this.props.game.state.decks : {}}

                       selectedHand={this.state.selectedHand}/>


        {/*<Card type={1} />*/}
        {/*<pre>Currently selected hand index (from numkeys): {this.state.selectedHand}</pre>*/}
        {/*<pre>{JSON.stringify(handCard, null, 2)}</pre>*/}
        <pre>{JSON.stringify(this.props.game, null, 2)}</pre>
    </div>
    );
  }
}
