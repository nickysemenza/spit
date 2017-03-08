let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let game = require('../models/game.js');


router.get('/replay/:id', (req, res) => {
  game.find({'id': req.params.id}).select('players winner state').exec(function (err, game) {
    if (err) {
      console.log(err);
    }
    res.send(game);
  });
});

module.exports = router;