import React, { Component, PropTypes } from 'react';
import {SOCKET_ADDRESS} from '../../config';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Opponents from './Opponents';
import Piles from './Piles';
import PlayerSection from './PlayerSection';
import { Link } from 'react-router';

const gameboardstyle = {
  position: 'relative',
  width: '935px',
  margin: 'auto'
};

export default class Replay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replayFrame: 0,
      moveBox: "",
      selectedHand: 1,
      cardAnimationState: ["hidden", "hidden", "hidden", "hidden"],
      animatingCards: [0, 0, 0, 0],
      countdown: true,
      timer: 3
    };
    // this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    // this.sendCommandDebug = this.sendCommandDebug.bind(this);
    // this.startGame = this.startGame.bind(this);
    // this.changeSelectedHand = this.changeSelectedHand.bind(this);
    // this.popDeck = this.popDeck.bind(this);
    // this.placeCardOnPile = this.placeCardOnPile.bind(this);
    // this.combineHands = this.combineHands.bind(this);
    // this.cardForHand = this.cardForHand.bind(this);
    // this.cardForPile = this.cardForPile.bind(this);
    // this.playerForPile = this.playerForPile.bind(this);
    // this.swch = this.swch.bind(this);
    // this.cdStart = this.cdStart.bind(this);
    // this.cdfalse = this.cdfalse.bind(this);

    // this.onUnload=this.onUnload.bind(this);
  }


  componentDidMount () {
    this.props.getReplay(this.props.game_id);

    setInterval(()=>{
      this.setState({replayFrame: this.state.replayFrame+1});
      console.log('next frame');
    },1000);
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
  cdStart() {
    this.setState({countdown: true});
  }
  cdfalse() {
    this.state.countdown = false;
  }
  swch() {
    let down = this.state.timer;
    if (this.state.countdown && this.props.game.state.started) {
        down--;
    }
    if(this.state.timer < 1) {
      this.cdfalse();
    }
    this.setState({timer: down});
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
  combineHands(whichHand){
    this.sendCommand(`MOVE COMBINE-HANDS ${this.state.selectedHand-1} ${whichHand}`);
  }
  cardForHand(hand) {
    if (this.props.game.state.started) {
      let handCard = this.props.game.state.hand;
      return (handCard[hand] && handCard[hand].length != 0) ? handCard[hand][handCard[hand].length - 1] : 0;
    }
    return 0;
  }
  playerForPile(pile) {
    return this.props.game.state.peekPiles ? Object.keys(this.props.game.state.peekPiles)[pile] : null;
  }
  cardForPile(player) {
    return player ? this.props.game.state.peekPiles[player] : 0;
  }

  render () {
    let gameState = this.props.replay ? this.props.replay[0].state[this.state.replayFrame] : null;



    let t = Object.keys(gameState.piles);
    let cards = [this.cardForHand(0), this.cardForHand(1), this.cardForHand(2), this.cardForHand(3)];
    let players = [this.playerForPile(0), this.playerForPile(1), this.playerForPile(2), this.playerForPile(3)];
    let piles = [gameState.piles[t[0]].pop(), gameState.piles[t[0]] ? gameState.piles[t[0]].pop() : 0, gameState.piles[t[2]] ? gameState.piles[t[2]].pop() : 0, gameState.piles[t[3]] ? gameState.piles[t[3]].pop() : 0];

    let gameView = (
      <div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="1" onKeyHandle={()=>{this.changeSelectedHand(1);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="2" onKeyHandle={()=>{this.changeSelectedHand(2);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="3" onKeyHandle={()=>{this.changeSelectedHand(3);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue="4" onKeyHandle={()=>{this.changeSelectedHand(4);}} />
        <KeyHandler keyEventName={KEYPRESS} keyValue=" " onKeyHandle={this.popDeck} />

        <div style={gameboardstyle}>
          <img className={`absolute cardimg ${this.state["cardAnimationState"][0]}`} src={`../../assets/cards/${this.state.animatingCards[0]}.png`} />
          <img className={`absolute cardimg ${this.state["cardAnimationState"][1]}`} src={`../../assets/cards/${this.state.animatingCards[1]}.png`} />
          <img className={`absolute cardimg ${this.state["cardAnimationState"][2]}`} src={`../../assets/cards/${this.state.animatingCards[2]}.png`} />
          <img className={`absolute cardimg ${this.state["cardAnimationState"][3]}`} src={`../../assets/cards/${this.state.animatingCards[3]}.png`} />

          <Opponents hands={gameState.hands}/>
          <Piles players={gameState.players} piles={piles} clickedPile={this.placeCardOnPile}/>
          <PlayerSection
            card1={[cards[0]]}
            card2={[cards[1]]}
            card3={[cards[2]]}
            card4={[cards[3]]}
            decks={this.props.game && gameState.decks ? gameState.decks : {}}
            startTime={gameState.startTime}
            clickedHand={this.combineHands}
            selectedHand={this.state.selectedHand}/>

        </div>
      </div>);


    return (
      <div>
        {gameView}
      </div>
    );
  }
}

/*

 //{/*<pre>Currently selected hand index (from numkeys): {this.state.selectedHand}</pre>*///}
//{/*<pre>{JSON.stringify(handCard, null, 2)}</pre>*/}
//<pre>{JSON.stringify(this.props.game, null, 2)}</pre>
