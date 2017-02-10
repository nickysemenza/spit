
let connectedClients = {};
function tickHandler() {
  setInterval(()=>{
    // console.log("tick");
    Object.keys(connectedClients).forEach(key=>{
      connectedClients[key].sendGameUpdate();
    });
  },300);
}

module.exports = {
  connectedClients,
  tickHandler
};
