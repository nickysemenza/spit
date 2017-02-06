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
    self.game_id = null;
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
      if(!this.authenticated) {
        this.sendMessage("ERROR NO-AUTH");
        return;
      }
      let game_id = parts[1];
      let game = gameList[game_id];
      if(game==undefined)
      {
        //auto create new game?
        game = new Game(game_id);
      }
      game.join(this);
      //user wants to join game
    }
    else if(parts[0]=="AUTH")
    {
      let secret = parts[1];
      if(secret=="test") {
        this.authenticated = true;
        this.sendMessage("AUTH OK");
        //todo: set userid, check in DB, etc
      }
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
