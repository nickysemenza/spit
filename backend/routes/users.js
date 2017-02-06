let express = require('express');
let router  = express.Router();
let User = require('../models/user');

router.get('/', (req, res) => {
  User.find(function(err, threads) {
    res.json(threads);
  });
});

router.post('/signup', (req, res) => {
  //temp
  console.log(req.body);
  new User({username: req.body.username}).save(res.json('ok'));
});

module.exports = router;
