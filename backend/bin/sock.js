
let connectedClients = {};
function test1() {
  setInterval(()=>{
    // console.log("tick");
    Object.keys(connectedClients).forEach(key=>{
      connectedClients[key].sendGameUpdate();
    });
  },2000);
}

module.exports = {
  connectedClients,
  test1
};
