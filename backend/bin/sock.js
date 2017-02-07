
let clients = [];
function test1() {
  setInterval(()=>{
    // console.log("tick");
    clients.forEach(c=>{
      c.sendGameUpdate();
    });
  },2000);
}

module.exports = {
  clients,
  test1
};
