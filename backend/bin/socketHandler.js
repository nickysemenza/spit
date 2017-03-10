let lobby = require('./Game').lobby;
let connectedClients = {};
function tickHandler() {
  setInterval(()=>{
    // console.log("tick");
    Object.keys(lobby).forEach(key=>{
      let game = lobby[key];
      game.startIfReady();
    });
    Object.keys(connectedClients).forEach(key=>{
      connectedClients[key].sendGameUpdate();
    });
  },25);
}

module.exports = {
  connectedClients,
  tickHandler
};
