import React, { Component, PropTypes } from 'react';
import {SOCKET_ADDRESS} from '../../config';
import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Opponents from './Opponents';
import Piles from './Piles';
import PlayerSection from './PlayerSection';
import { Link } from 'react-router';
import { IndexLink } from 'react-router';

const gameboardstyle = {
  position: 'relative',
  width: '935px',
  margin: 'auto'
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveBox: "",
      selectedHand: 1,
      cardAnimationState: ["hidden", "hidden", "hidden", "hidden"],
      animatingCards: [0, 0, 0, 0],
      countdown: true,
      timer: 3
    };
    this.handleMoveBoxChange = this.handleMoveBoxChange.bind(this);
    this.sendCommandDebug = this.sendCommandDebug.bind(this);
    this.startGame = this.startGame.bind(this);
    this.changeSelectedHand = this.changeSelectedHand.bind(this);
    this.popDeck = this.popDeck.bind(this);
    this.placeCardOnPile = this.placeCardOnPile.bind(this);
    this.combineHands = this.combineHands.bind(this);
    this.cardForHand = this.cardForHand.bind(this);
    this.cardForPile = this.cardForPile.bind(this);
    this.playerForPile = this.playerForPile.bind(this);
    this.swch = this.swch.bind(this);
    this.cdStart = this.cdStart.bind(this);
    this.cdfalse = this.cdfalse.bind(this);

    this.onUnload=this.onUnload.bind(this);
  }


  componentDidMount () {
    let intervalId = setInterval(this.swch, 1000);
    window.addEventListener("beforeunload",this.onUnload);
    this.websocket = new WebSocket(`ws://${SOCKET_ADDRESS}`);
    this.websocket.onmessage = (event) => {
      let split = event.data.split(" ");
      if(split[0]=="GAME-STATE") {
        let data = JSON.parse(split[1]);
        //console.log(data);
        this.props.receiveGameState(data);
      }
      else if(split[0]=="AUTH-OK")
        this.websocket.send('JOIN-GAME '+this.props.game_id);
      else if(split[0]=="EXECUTED-MOVE")
        this.doAnimation(split[1], split[2], split[3]);
      else if(split[0]=="EXECUTED-SPIT")
        this.spitHappened();
      else
        console.log(event.data);
    };
    this.websocket.onopen = () => {
      this.websocket.send('AUTH '+this.props.user.token);
    };
  }
  componentWillUnmount(){
    window.removeEventListener("beforeunload",this.onUnload);
  }
  onUnload(event){
    this.websocket.send('LEAVE-GAME '+this.props.game_id);
  }
  spitHappened() {
    //TODO @marty
    console.log("spit happened");
  }
  doAnimation(playerName, handNum, deckName) {
    console.log("@NICKY: THIS ISN'T BEING CALLED after refresh");
    handNum++;//sad, 0->1 indexing switch
    let pileNum;
    let pilesTemp = this.props.game.state.peekPiles;
    if(Object.keys(pilesTemp)[0]==deckName)
      pileNum = 1;
    if(Object.keys(pilesTemp)[1]==deckName)
      pileNum = 2;
    if(Object.keys(pilesTemp)[2]==deckName)
      pileNum = 3;
    if(Object.keys(pilesTemp)[3]==deckName)
      pileNum = 4;
    let fromOwnHand = this.props.user.username == playerName;

    if (fromOwnHand) {
      this.state["cardAnimationState"][handNum - 1] = `Ah${handNum}p${pileNum}`;
      this.state["animatingCards"][handNum - 1] = this.cardForHand(handNum - 1);
      console.log("trigger animation");

      // post animation actions
      setTimeout(() => {
          this.state["cardAnimationState"][handNum - 1] = "hidden";
        }, 250
      ).bind(this);
    }
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
    let gameState = this.props.game.state;

    let loggedOutMessage = (<div>
      <h1>You aren't logged in right now!</h1>
      <h1><Link to="/">Go register</Link></h1>
    </div>);

    let cards = [this.cardForHand(0), this.cardForHand(1), this.cardForHand(2), this.cardForHand(3)];
    let players = [this.playerForPile(0), this.playerForPile(1), this.playerForPile(2), this.playerForPile(3)];
    let piles = [this.cardForPile(players[0]), this.cardForPile(players[1]), this.cardForPile(players[2]), this.cardForPile(players[3])];

    let gameView = !(this.state.countdown && gameState.started) ? (
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
          <Piles players={players} piles={piles} clickedPile={this.placeCardOnPile}/>
          <PlayerSection
            card1={cards[0]}
            card2={cards[1]}
            card3={cards[2]}
            card4={cards[3]}
            decks={this.props.game && gameState.decks ? gameState.decks : {}}
            startTime={gameState.startTime}
            clickedHand={this.combineHands}
            selectedHand={this.state.selectedHand}/>

        </div>
      </div>)
      :
      (<div>
      <img className="leftBanner" src="../../assets/Sidebar.png" />
      <img className="rightBanner" src="../../assets/Sidebar.png" />
      <div style={{textAlign: "center"}}>
            <h1>Lobby</h1>
            <h1 className="countdowntxt">Joining game in: </h1>
            <button className="timeBttn" onClick={this.cdStart}> {this.state.timer} </button>

      </div>
      </div>);

    let lobbyNames = gameState.clients ? gameState.clients.map(c=><tr key={c.name}>
        <td>{c}</td>
        <td>✅</td>
      </tr>): '';

    let lobbyView = (
      <div>
        <img className="leftBanner" src="../../assets/Sidebar.png" />
        <img className="rightBanner" src="../../assets/Sidebar.png" />
        <div className="flex-leaderboard">
          <div style={{textAlign: "center"}}>
            <h1>Lobby</h1>

            <table>
              <tbody className="lobby flex-vertical">
              {lobbyNames}
              </tbody>
            </table>
            <span onClick={this.startGame} className="readyUp">Ready Up</span>

          </div>
        </div>
      </div>
    );

    let index=1;
    let gameResult = gameState.winner ? gameState.winner.map(c=><tr key={c}>
    <td>{c}</td>
    <td>{index++}</td>
    </tr>): '';

    let finishedView = (
      <div>
        <img className="leftBanner" src="../../assets/Sidebar.png" />
        <img className="rightBanner" src="../../assets/Sidebar.png" />
        <div className="flex-leaderboard">
          <div style={{textAlign: "center"}}>
            <h1>Game Results</h1>

            <table>
              <tbody className="lobby flex-vertical">
              {gameResult}
              </tbody>
            </table>
            <a href="/"><span className="readyUp">Home</span></a>

          </div>
        </div>
      </div>
    );


    let loggedInView = gameState.finished ? finishedView : gameState.started ? gameView : lobbyView;
    return (
      <div>
        {this.props.user.authenticated ? loggedInView : loggedOutMessage}
      </div>
    );
  }
}

/*

 //{/*<pre>Currently selected hand index (from numkeys): {this.state.selectedHand}</pre>*///}
//{/*<pre>{JSON.stringify(handCard, null, 2)}</pre>*/}
//<pre>{JSON.stringify(this.props.game, null, 2)}</pre>
