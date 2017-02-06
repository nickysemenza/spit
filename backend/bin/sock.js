
let clients = [];
function test1() {
  setInterval(()=>{
    // console.log("tick");
    clients.forEach(c=>{
      c.sendMessage('server says hiiiii');

      c.sendGameUpdate();
      // c.send(JSON.stringify(c));
    });
  },2000);
}

module.exports = {
  clients,
  test1
};
