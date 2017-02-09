
let connectedClients = {};
function tickHandler() {
  setInterval(()=>{
    // console.log("tick");
    Object.keys(connectedClients).forEach(key=>{
      connectedClients[key].sendGameUpdate();
    });
  },1000);
}

module.exports = {
  connectedClients,
  tickHandler
};
