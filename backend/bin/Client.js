/**
 * Client connected to the server
 */
let Game = require('./Game').Game;
let gameList = require('./Game').gameList;

class Client {
  constructor(socket) {
    let self = this;
    self.socket = socket;
    self.name = "anon";
    self.authenticated = false;
  }

  //Write data to the client
  sendMessage(message) {
    console.log("Sending message to socket <"+this.name+">\n\t"+message);
    this.socket.send(message, (err) => {
      if(err) console.log(err);
    });
  }
  //todo: remove from list
  processMessage(message) {
    console.log("msg received from <"+this.name+">\n\t"+message);
    let parts = message.split(" ");
    if(parts[0]=="JOIN-GAME")
    {
      let game_id = parts[1];
      //user wants to join game

    }
  }
  sendGameUpdate() {
    //get current game, and send the board
    let g = gameList['test'];
    this.sendMessage("GAME-STATE "+JSON.stringify(g.getGameState()));
  }
}

module.exports = {
  Client
};
