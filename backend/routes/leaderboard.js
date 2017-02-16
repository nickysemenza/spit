let express = require('express');
let router  = express.Router();
let mongoose = require('mongoose');


router.get('/', (req, res) => {
  res.json([
    {
      username: "marty",
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
