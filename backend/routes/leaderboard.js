let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');
let user = require('../models/user.js')


router.get('/', (req, res) => {
  /*user.find({ }).exec(function (err, users) {
    if (err) return handleError(err);
    console.log(users);// Space Ghost is a talk show host.
  });*/
  res.json([
    {
      username: "marty19010",
      win: 432,
      loss: 32
    },
    {
      username: "marty1234",
      win: 445,
      loss: 31
    },
    {
      username: "marty2134fakedata",
      win: 41,
      loss: 3
    },
    {
      username: "nicky",
      win: 42,
      loss: 13
    }
  ]);
});

module.exports = router;
