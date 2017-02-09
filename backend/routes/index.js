let express = require('express');
let router  = express.Router();
const util = require('util');
let connectedClients = require('../bin/socketHandler').connectedClients;
router.get('/', (req, res) => {
  res.json("hi");
});
router.get('/clients', (req, res) => {
  let clients = Object.keys(connectedClients).map((key)=>{
    let c = connectedClients[key];
    return {
      uid: c.uid,
      name: c.name,
      in_game: c.game !== null,
      authenticated: c.authenticated,
      killed: c.killed
    };
  });
  res.json(clients);
});

module.exports = router;
