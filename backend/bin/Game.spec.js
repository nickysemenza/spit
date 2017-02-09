let expect = require('chai').expect;
let Client = require('./Client').Client;
let Game = require('./Game').Game;
let WSClientMock = require('./WSClientMock');
let config = require('../config');
let mongoose = require('mongoose');
// mongoose.connect(config.MONGO_DB);

mongoose.models = {};
mongoose.modelSchemas = {};
describe('Game::initial state', () => {
  let g = new Game("game1");
  expect(g.started).to.equal(false);
  expect(g.id).to.equal("game1");
});
describe('Game::seeding', () => {
  let g2 = new Game("game2");
  let c1sock = new WSClientMock();
  let c1 = new Client(c1sock);
  c1.name = "p1";
  c1.authenticated = true;

  let c2sock = new WSClientMock();
  let c2 = new Client(c2sock);
  c2.name = "p2";
  c2.authenticated = true;

  c1sock.sendMsgToServer("JOIN-GAME game2");
  c2sock.sendMsgToServer("JOIN-GAME game2");

  c1sock.sendMsgToServer("START-GAME");

  //2 players means 2 piles
  expect(Object.keys(g2.gameState.piles).length).to.equal(2);
  //players should not have the same top card on their deck
  expect(g2.gameState.decks["p1"][0]).to.not.equal(g2.gameState.decks["p2"][0]);

});

