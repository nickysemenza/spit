let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let user = require('../models/user.js');


router.get('/', (req, res) => {
  user.find({ }).select('username totalScore gamesWon').exec(function (err, users) {
    if (err) {
      console.log(err);
    }
    res.send(users);
  });
});

module.exports = router;
