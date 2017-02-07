let gameList = {};
class Game {
  constructor(id) {
    let self = this;
    self.id = id;
    self.started = false;
    self.clients = [];
    self.gameState = {
      hands: {},//the 4x cards
      piles: [],
      decks: {}
    };
    gameList[id] = self;
  }

  /**
   * Makes all players spit
   */
  spit() {
    console.log('spitting');
    this.clients.forEach((c,index) => {
      let pCard = this.gameState.decks[c.name].pop();
      if(pCard!= undefined) {
        this.gameState.piles[index].push(pCard);
      }

    });
  }

  /**
   * Plays a card from your hand to a pile
   * @param client
   * @param src the index of your hand
   * @param dest the index of the piles array
   */
  playCard(client,src,dest) {
    //moves a card from self.gameState.hands[username][loc]
    //to self.piles[loc2]
  }
  /**
   * Moves a card within your hand
   * @param client
   * @param src the index of your hand
   * @param dest the index of your hand
   */
  combineHands(client, src, dest) {
    //moves a card within a player's hand
    //i.e. moves self.gameState.hands[username][2]
    //        to self.gameState.hands[username][3]
  }

  /**
   * Pops your deck and adds it to the first available spot in your hand
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

    myHands.forEach((hand,index)=>{
      if(hand==0) {
        this.gameState.hands[client.name][index] = [topCard];
        this.gameState.decks[client.name].pop();
      }
      else if(hand[0]%13==topCard || topCard%13==hand[0]) {
        this.gameState.hands[client.name][index].push(topCard);
        this.gameState.decks[client.name].pop();
      }
    })



  }
  makeMove(client, moveCmd) {
    console.log(`[MOVE] \n\tgame:${this.id}\n\tmove: ${moveCmd} \n\tclient:${client.name}`);
    let parts = moveCmd.split(" ");
    let move = parts[0];
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

  }
  addPlayer(client) {
    //todo: check eligibility
    if(this.started)//can't join a started game
      return;
    console.log(client.name+' joining game '+this.id);
    this.clients.push(client);
  }
  start() {
    console.log("time to start game "+this.id);
    this.seed();
    this.started=true;
  }
  seed() {
    let numPlayers = this.clients.length;
    this.clients.forEach((c) => {
      this.gameState.decks[c.name]=Game.getShuffledDeck();
      this.gameState.decks[c.name].push(51);
      this.gameState.decks[c.name].push(20);
      this.gameState.hands[c.name]=[[4],[23,11],[12],[0]];
      this.gameState.piles = new Array(numPlayers).fill([0])
    });
    // console.log(this.gameState.decks);


  }
  static getShuffledDeck() {
    let cards = [...Array(52).keys()].map(x => ++x);
    return Game.shuffle(cards);
  }
  getGameState(username) {
    // console.log(username);
    //todo: make sure user is in game
    let clients = this.clients.map((c)=>c.name);

    if(!clients.includes(username) || username=="anon")
      return {error: "not in game"};

    let state = {
      clients,
      started: this.started
    };
    if(!this.started)
      return state;

    let myDeck = this.gameState.decks[username];
    return {
      clients,
      started: this.started,
      piles: this.gameState.piles,
      deck: {
        topCard: myDeck[myDeck.length-1],
        count: myDeck.length
      },
      // hand: this.gameState.hands[username],
      hands: this.gameState.hands,


    };
    // return {
    //   numPlayers: 2,
    //   deck: {count: 4, topCard: 11},
    //   hand: [[4,18],[23],[rand],[9,12]],
    //   center: [23,42,19,3],
    //   playerHands: 'todo',
    //   playerCounts: 'todo'
    // };
  }


  static shuffle(array) {
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
};
