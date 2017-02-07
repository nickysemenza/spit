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
  spit() {
    //makes all players spit
  }
  playCard(client,src,dest) {
    console.log(`Game ${this.id}: move: client:${client}`);
    //moves a card from self.gameState.hands[username][loc]
    //to self.piles[loc2]
  }
  combineHands(client, src, dest) {
    //moves a card within a player's hand
    //i.e. moves self.gameState.hands[username][2]
    //        to self.gameState.hands[username][3]
  }
  topDeck(client) {
    //pops a card from self.gameState.decks[username]
    //places a card on first available self.gameState.hands[username]
  }
  join(client) {
    //todo: check eligibility
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
      this.gameState.hands[c.name]=[[4],[23,11],[12],[0]];
    });
    console.log(this.gameState.decks);


  }
  static getShuffledDeck() {
    let cards = [...Array(52).keys()].map(x => ++x);
    return Game.shuffle(cards);
  }
  getGameState(username) {
    //temp test
    // return this.gameState;
    let clients = this.clients.map((c)=>c.name);

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
