let gameList = {};
let lobby = {};
let utils = require('./utils');
let gameSchema = require('../models/game.js');
let User = require('../models/user.js');
let mongoose = require('mongoose');
//var opts = { server: { auto_reconnect: false }, user: 'username', pass: 'mypassword' }
// let db = mongoose.createConnection('localhost', 'games', 27017);
//
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

class Game {
  constructor(id) {
    let self = this;
    self.id = id;
    self.started = false;
    self.finished = false;
    self.startTime = null;
    self.clients = [];
    self.spectators = [];
    self.gameState = {
      hands: {},//the 4x cards
      piles: {},
      decks: {}
    };
    gameList[id] = self;
    lobby[id] = self;
    self.stateSnapshots = [];
    self.validMoves = {}; //1 if still has moves, 0 if no valid moves
    self.winner = [];
  }

  /**
   * Persists the game to mongoDB
   */
  saveGame() {
    //save this.gameState, this.id, etc
    let gameJSON = new gameSchema({
      id: this.id,
      totalMoves: this.stateSnapshots.length,
      winner: this.winner[0],
      state: this.stateSnapshots,
      finished: this.finished
    });

    this.clients.forEach((c)=>{
      gameJSON.players.push(c.name);
    });

    // gameJSON.isNew = false;
    console.log(gameJSON);
    gameJSON.save((err, g) => {
      if (err) return console.error(err);
   });
  }

  updateWinner(){
    User.findOneAndUpdate({'username': this.winner[0]}, {$inc: { gamesWon: 1} }, {upsert:true}, function(err, doc){
      if (err) return console.log(500, { error: err });
      return console.log("succesfully saved");
    });
  }

  updateUsers(){
    this.clients.forEach((c) => {
      User.findOneAndUpdate({'username': c.name}, {$inc: { gamesPlayed: 1} }, {upsert:true}, (err, doc) => {
        if (err) return console.log(500, { error: err });
        console.log(c.name + "updated games Played");
      });
    });
  }

  updateScores(){
    let x = 15;
    this.winner.forEach((name) => {
      User.findOneAndUpdate({'username': name}, {$inc: { totalScore: x, gamesPlayed: 1} }, {upsert:true}, (err, doc) => {
        if (err) return console.log(500, { error: err });
        console.log(name + " updated User Data");
      });
      x -= 5;
    });
  }


  /**
   * Takes a snapshot of the game state
   */
  snapshot() {
    let t = this.gameState;
    t.started = this.started;
    t.startTime = this.startTime;
    // t.clients = this.clients;
    // t.peekPiles = this.getGameState(this.clients[0].name).peekPiles;
    this.stateSnapshots.push(t);
  }

  /**
   * Makes all players spit
   * command: MOVE SPIT
   */
  spit() {
    console.log('spitting');
    this.clients.forEach((c) => {
      let pCard = this.gameState.decks[c.name].pop();
      if(pCard!= undefined) {
        this.gameState.piles[c.name].push(pCard);
      }
      c.sendSpitUpdate();
    });
  }

  /**
   * Plays a card from your hand to a pile
   * command: PLAY-CARD index1 index2
   * @param client
   * @param src the index of your hand
   * @param dest the namedindex of the piles array
   */
  playCard(client,src,dest) {
    //moves a card from self.gameState.hands[username][loc]
    //to self.piles[loc2]

    //let handCard = this.gameState.hands[client.name][src][0];//todo: [0]??
    let handCard = this.gameState.hands[client.name][src][this.gameState.hands[client.name][src].length-1];
    console.log(`playCard: hand: ${handCard} to ${dest}`);

    let pile = this.gameState.piles[dest];
    if(pile===undefined) {
      console.log('trying to play card out of range');
      return;
    }
    let destPileCard = pile[pile.length-1];
    if(utils.areCardsSequential(handCard,destPileCard) || destPileCard==0) {
      //push it on
      this.gameState.piles[dest].push(handCard);
      this.gameState.hands[client.name][src].pop();//pop off the handcard

      let cli = this.gameState.hands[client.name];
      if(cli[0].length+cli[1].length+cli[2].length+cli[3].length==4&&this.gameState.decks[client.name].length==0){
        this.winner.push(client.name);
      }

      this.clients.forEach(c=>{
        c.sendMoveUpdate(client.name,src,dest);
      });
    }
    else {
      console.log('cant play that card');
    }
  }
  /**
   * Moves a card within your hand
   * command: COMBINE-HANDS index1 index2
   * @param client
   * @param src the index of your hand
   * @param dest the index of your hand
   */
  combineHands(client, src, dest) {
    //moves a card within a player's hand
    //i.e. moves self.gameState.hands[username][2]
    //        to self.gameState.hands[username][3]
    console.log('combineHands: hand '+src+' to '+dest);
    let s = this.gameState.hands[client.name][src];
    let d = this.gameState.hands[client.name][dest];
    if(s.length>1&&d.length>1&&(s[s.length-1]%13==d[d.length-1]%13)){
      d.push(s.pop());
    }
  }

  /**
   * Pops your deck and adds it to the first available spot in your hand
   * command: MOVE POP-DECK
   * @param client
   */
  popDeck(client) {
    console.log('popdeck, user:'+client.name);
    //pops a card from self.gameState.decks[username]
    //places a card on first available self.gameState.hands[username]
    let myDeck = this.gameState.decks[client.name];
    let myHands = this.gameState.hands[client.name];
    let topCard = myDeck[myDeck.length-1];
    if(topCard==undefined)//nothing left in pile
      return;

    let done = false;//only want to pop once

    myHands.forEach((hand)=>{
      if(hand[hand.length-1]==0 && !done){
        hand.push(this.gameState.decks[client.name].pop());
        done=true;
      }
    });
  }
  endGame(){
    console.log("END GAME");
    this.finished = true;

    let remainingCards = {};
    this.clients.forEach((c)=>{
      remainingCards[c.name]=this.gameState.decks[c.name].length+this.gameState.hands[c.name][0].length+this.gameState.hands[c.name][1].length+this.gameState.hands[c.name][2].length+this.gameState.hands[c.name][3].length-4;
    });
    let s = JSON.stringify(remainingCards);
    //console.log("remainingCards: "+s);

    let sortedWinners = [];
    for (let key in remainingCards){
      sortedWinners.push([key,remainingCards[key]]);
    }
    sortedWinners.sort((a,b) => {
      return a[1]-b[1];
    });
    //console.log(sortedWinners);

    let i;
    for (i=0;i<sortedWinners.length;i++){
      if(!this.winner.includes(sortedWinners[i][0])){
        this.winner.push(sortedWinners[i][0]);
      }
    }

    this.saveGame();
    //this.updateUsers();
    this.updateWinner();
    this.updateScores();
    console.log(this.winner);

  }
  updateValidMoves(){
    this.clients.forEach((c)=>{
      let topHand = [];
      let hand0=this.gameState.hands[c.name][0];
      let hand1=this.gameState.hands[c.name][1];
      let hand2=this.gameState.hands[c.name][2];
      let hand3=this.gameState.hands[c.name][3];
      let counter=0;

      if(hand0.length>1){
        topHand[counter]=hand0[hand0.length-1]%13;
        counter++;
      }
      if(hand1.length>1){
        topHand[counter]=hand1[hand1.length-1]%13;
        counter++;
      }
      if(hand2.length>1){
        topHand[counter]=hand2[hand2.length-1]%13;
        counter++;
      }
      if(hand3.length>1){
        topHand[counter]=hand3[hand3.length-1]%13;
        counter++;
      }

      if((hand0.length==1||hand1.length==1||hand2.length==1||hand3.length==1)&&this.gameState.decks[c.name].length>0){
        this.validMoves[c.name]=1;
      }
      else if((new Set (topHand).size != topHand.length)){
        this.validMoves[c.name]=1;
      }
      else{
        let done=0;
        topHand.forEach((c2)=>{
          for (let key in this.gameState.piles){
              let c3 = this.gameState.piles[key];
              if((c2==((c3[c3.length-1]-1)%13)||c2==((c3[c3.length-1]+1)%13))&&!done){
                this.validMoves[c.name]=1;
                done=1;
              }
          }
        });
        if(!done){
          this.validMoves[c.name]=0;
        }
      }
    });
  }
  makeMove(client, moveCmd) {
    // this.saveGame();
    console.log(`[MOVE] \n\tgame:${this.id}\n\tmove: ${moveCmd} \n\tclient:${client.name}`);
    if(!this.started || this.finished || this.spectators.includes(client.name)) {
      //can't make a move yet
      return;
    }
    let parts = moveCmd.split(" ");
    let move = parts[0];
    this.snapshot();
    switch (move) {
      case "POP-DECK":
        this.popDeck(client);
        break;

      case "SPIT":
        this.spit();
        break;

      case "COMBINE-HANDS":
        this.combineHands(client, parts[1], parts[2]);
        break;

      case "PLAY-CARD":
        this.playCard(client, parts[1], parts[2]);
        break;
    }
    this.updateValidMoves();
    let shouldSpit=0;
    this.clients.forEach((c)=>{
      shouldSpit+=this.validMoves[c.name];
    });
    if(!shouldSpit){
      let end=0;
      for (let key in this.gameState.decks){
        let d = this.gameState.decks[key];
        end+=d.length;
      }
      console.log(end);
      if(!end){
        this.endGame();
      }
      else{
        this.makeMove(client,"SPIT");
      }
    }
  }
  addPlayer(client) {
    //todo: check eligibility
    let eligible = true;
    let spectator = false;
    if (this.started){//can't join a started game
      eligible = false;
      spectator = true;
    }
    if(this.clients.length >= 4){//full game
      eligible = false;
      spectator = true;
    }
    this.clients.forEach((c) => {
      if (c.name == client.name) {
        //user is already in game
        console.log(c.name + " is already in this game");
        eligible = false;
        spectator = false;
      }
    });
    if (eligible) {
      console.log(client.name + ' joining game ' + this.id);
      this.clients.push(client);
    }
    else if (spectator) {
      console.log(client.name + ' spectating game '+this.id);
      this.spectators.push(client.name);
    }
  }
  startIfReady() {
    //console.log("tryna start if ready");
    if(this.started)
      return;
    let shouldStart = false;
    if(this.clients.length == 4 ) {
      shouldStart = true;
    }
    //or if force start

    if(shouldStart)
      this.start();
  }
  removePlayer(client){
    //console.log(client);
    if(!this.started)
      this.clients.splice(this.clients.lastIndexOf(client),1);
    //console.log(this.clients.lastIndexOf(client));
    //console.log(this.clients);
  }
  /**
   * Starts a game, removing it from the lobby list
   */
  start() {
    if(this.started)
      return;
    console.log("time to start game "+this.id);
    this.started=true;
    this.startTime = Date.now();
    //delete lobby[this.id];//remove from active lobby
    do{
      module.exports.currentLobby++;
    }
    while (gameList[module.exports.currentLobby]!=undefined);
    console.log("GAME.JS "+module.exports.currentLobby);
    this.seed();
  }
  seed() {
    let numPlayers = this.clients.length;
    this.clients.forEach((c) => {
      this.gameState.decks[c.name]=this.getShuffledDeck();
      // this.gameState.decks[c.name].push(51);
      // this.gameState.decks[c.name].push(20);
      this.gameState.hands[c.name]=[[0],[0],[0],[0]];
      this.gameState.piles[c.name] = [0];// = new Array(numPlayers).fill([0]);
      this.validMoves[c.name]=1;
    });
    this.makeMove(this.clients[0],"SPIT");
    this.clients.forEach((c) => {
    //   //pop top 4 to hand slots
       this.makeMove(c,"POP-DECK");
       this.makeMove(c,"POP-DECK");
       this.makeMove(c,"POP-DECK");
       this.makeMove(c,"POP-DECK");
    });
    // console.log(this.gameState.decks);
  }
  getShuffledDeck() {
    let cards = [...Array(52).keys()].map(x => ++x);
    return this.shuffle(cards.slice(0));
  }
  getGameState(username) {
    if(this.spectators.includes(username))
      username=this.clients[0].name;
    // console.log(username);
    //todo: make sure user is in game
    let clients = this.clients.map((c)=>c.name);

    if((!clients.includes(username)&&!this.spectators.includes(username)) || username=="anon")
      return {error: "not in game"};

    let state = {
      clients,
      started: this.started
    };
    if(!this.started)
      return state;

    let decks = {};
    this.clients.forEach((c)=>{
        decks[c.name] = this.gameState.decks[c.name].length+this.gameState.hands[c.name][0].length+this.gameState.hands[c.name][1].length+this.gameState.hands[c.name][2].length+this.gameState.hands[c.name][3].length-4;
    });

    let hands = {};
    this.clients.forEach((c)=>{
      if(c.name != username)//don't need to display client's own decks here, they use `hand` prop
        hands[c.name] = this.gameState.hands[c.name];
    });

    let peekPiles = {};
    this.clients.forEach((c)=>{
      //TODO: maybe sort it so that `username` entry is first for UI purposes
      let pile = this.gameState.piles[c.name];
      peekPiles[c.name] = pile[pile.length-1];
    });
    let myDeck = this.gameState.decks[username];
    //console.log('USERNAME: '+username);
    return {
      id: this.id,
      numMoves: this.stateSnapshots.length,
      clients,
      started: this.started,
      finished: this.finished,
      startTime: this.startTime,
      piles: this.gameState.piles,
      peekPiles,
      deck: {
        topCard: myDeck[myDeck.length-1],
        count: myDeck.length
      },
      decks,
      hand: this.gameState.hands[username],
      hands,
      validMoves: this.validMoves[username],
      winner:this.winner
    };
  }


  shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
}

module.exports = {
  Game,
  gameList,
  lobby,
  currentLobby:0
};
