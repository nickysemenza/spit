let gameList = {};
class Game {
  constructor(id) {
    let self = this;
    self.id = id;
    self.started = false;
    self.players = [];
    gameList[id] = self;
  }
  move(player,src,dest) {
    console.log(`Game ${self.id}: move: player:${player}`);
  }
  join(client) {
    //todo: check eligibility
    console.log(client.name+' joining game '+this.id);
    this.players.push(client);
  }
  getGameState() {
    //temp test
    return {
      numPlayers: 2,
      deck: {count: Math.random(), topCard: "club-2"},
      hand: {1: ["club-4","spade-4"], 2: ["diamond-K"], 3: ["spade-J"], 4: ["spade-1"]},
      center: {1: "club-1", 2: "diamond-K", 3: "spade-J", 4: "spade-1"},
      playerHands: 'todo',
      playerCounts: 'todo'
    };
  }
}

module.exports = {
  Game,
  gameList,
};
