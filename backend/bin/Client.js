/**
 * Client connected to the server
 */
let Game = require('./Game').Game;
let gameList = require('./Game').gameList;
let jwt = require('jsonwebtoken');
let User = require('../models/user');
let randomstring = require("randomstring");
class Client {
  constructor(socket) {
    let self = this;
    self.uid = randomstring.generate();
    self.socket = socket;
    self.name = "anon";
    self.game = null;
    self.authenticated = false;
    self.killed = false;


    socket.on('message', (message) => {
      self.processMessage(message);
    });
    socket.on('close', () => {
      self.killMe();
      console.log('disconnected');
    });

  }
  getUID() {
    return this.uid;
  }
  killMe() {
    console.log("killing client uid "+this.uid);
    this.killed = true;
    //todo: to something to the active game this client is in
  }

  //Write data to the client
  sendMessage(message) {
    // console.log("Sending message to socket <"+this.name+">\n\t"+message);
    if(this.killed) {
      console.log("socket " + this.uid + " is dead");
      return;
    }
    this.socket.send(message, (err) => {
      if(err) console.log(err);
    });
  }
  //todo: remove from list
  processMessage(message) {
    console.log("msg received from <"+this.name+">\n\t"+message);
    let parts = message.split(" ");
    switch (parts[0]) {
      case "JOIN-GAME":
        if (!this.authenticated) {
          this.sendMessage("ERROR NO-AUTH");
          return;
        }
        const game_id = parts[1];
        let game = gameList[game_id];
        if (game == undefined) {
          //auto create new game?
          game = new Game(game_id);
        }

        game.addPlayer(this);
        this.game = game;
        //user wants to join game
        break;

      case "START-GAME":
        if(!this.game) {
          //can't start a game if you aren't in it
          break;
        }
        this.game.start();
        break;
      case "MOVE":
        if(!this.game) {
          //can't make a move without a game
          break;
        }
        let client = this;
        let movecmd = message.substr(message.indexOf(' ')+1);
        this.game.makeMove(client,movecmd);
        break;


      case "AUTH":
        let token = parts[1];
        let decoded = jwt.decode(token, {complete: true});
        if (decoded) {
          User.findById(decoded.payload.id, (err, user) => {
            if (user) {
              this.authenticated = true;
              this.name = user.username;
              this.sendMessage("AUTH-OK");
              //todo: set userid, check in DB, etc
            }
            else {
              this.sendMessage("AUTH-ERROR");
            }
          });
        }
        else
          this.sendMessage("AUTH-ERROR");
        break;
    }
  }
  sendGameUpdate() {
    //get current game, and send the board
    let name = this.name;
    if(this.game)
      this.sendMessage("GAME-STATE "+JSON.stringify(this.game.getGameState(name)));
  }
}

module.exports = {
  Client
};
