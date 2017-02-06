let gameList = {};
class Game {
  constructor(id) {
    let self = this;
    self.id = id;
    self.started = false;
    self.clients = [];
    self.hands = {};//the 4x cards
    self.piles = [];
    self.decks = {};
    gameList[id] = self;
  }
  playCard(client,src,dest) {
    console.log(`Game ${self.id}: move: client:${client}`);
  }
  combineHands(client, src, dest) {
    //moves a card within a player's hand
  }
  topDeck(client) {
    //pops a deck from a player
  }
  join(client) {
    //todo: check eligibility
    console.log(client.name+' joining game '+this.id);
    this.clients.push(client);
  }
  start() {
    seed();
  }
  seed() {
    let numPlayers = this.clients.length;
    for(c in this.clients) {
      self.decks[c.name]=Game.getShuffledDeck();
    }

  }
  static getShuffledDeck() {
    let cards = [...Array(52).keys()].map(x => ++x);
    return Game.shuffle(cards);
  }
  getGameState() {
    //temp test
    let rand = Math.floor(Math.random() * 52) + 1;
    return {
      numPlayers: 2,
      deck: {count: 4, topCard: 11},
      hand: [[4,18],[23],[rand],[9,12]],
      center: [23,42,19,3],
      playerHands: 'todo',
      playerCounts: 'todo'
    };
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
