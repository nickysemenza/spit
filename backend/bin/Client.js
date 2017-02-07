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
    socket.on('close', function close() {
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
    console.log("Sending message to socket <"+this.name+">\n\t"+message);
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
      this.game = game;
      //user wants to join game
    }
    else if(parts[0]=="START-GAME") {
      let game_id = parts[1];
      let game = gameList[game_id];
      game.start();
    }
    else if(parts[0]=="AUTH")
    {
      let token = parts[1];
      let decoded = jwt.decode(token, {complete: true});
      if(decoded) {
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
