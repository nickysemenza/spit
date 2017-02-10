let expect = require('chai').expect;
let Client = require('./Client').Client;
let WSClientMock = require('./WSClientMock');
let config = require('../config');
let mongoose = require('mongoose');
// mongoose.connect(config.MONGO_DB);

mongoose.models = {};
mongoose.modelSchemas = {};
describe('Client::connecting', () => {

  it('should be able to access socket prop of Client', () => {
    let clientSocket = new WSClientMock();
    let client = new Client(clientSocket);
    expect(client.socket).to.deep.equal(clientSocket);
  });
  it('Client uid should be random', () => {
    let clientSocket = new WSClientMock();
    let client = new Client(clientSocket);
    expect(client.uid == "something").to.equal(false);
  });
  it('Client should be killable', () => {
    let clientSocket = new WSClientMock();
    let client = new Client(clientSocket);
    client.killMe();
    expect(client.killed).to.equal(true);
  });
});
describe('Client::games', () => {
  // it('Client should be able to be authenticated', () => {
  //   let clientSocket = new WSClientMock();
  //   let client = new Client(clientSocket);
  //
  //   expect(client.authenticated).to.equal(false);
  //   clientSocket.sendMsgToServer("a");
  //
  //   expect(client.authenticated).to.equal(true);
  // });
  it('Client should not join game if no auth', () => {
    let clientSocket = new WSClientMock();
    let client = new Client(clientSocket);

    expect(client.authenticated).to.equal(false);
    clientSocket.sendMsgToServer("JOIN-GAME 12345");
    console.log(clientSocket.messages);

    expect(clientSocket.messages.pop()).to.equal("ERROR NO-AUTH");
  });
  it('Authenticated Client can join and start game', () => {
    let clientSocket = new WSClientMock();
    let client = new Client(clientSocket);

    client.authenticated = true;
    client.name = 'test';
    expect(client.authenticated).to.equal(true);
    expect(client.game).to.equal(null);
    clientSocket.sendMsgToServer("JOIN-GAME 12345");
    expect(client.game).to.not.equal(null);

    expect(client.game.started).to.equal(false);
    clientSocket.sendMsgToServer("START-GAME");
    expect(client.game.started).to.equal(true);
  });
});
