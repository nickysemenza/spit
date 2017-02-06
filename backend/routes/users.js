let express = require('express');
let router  = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  User.find(function(err, threads) {
    res.json(threads);
  });
});

router.post('/signup', (req, res) => {
  //temp
  console.log(req.body);
  new User({username: req.body.username}).save((err, user) => {
    let token = jwt.sign({ id: user._id }, 'shhhhh');
    res.json({id: user._id, token});
  });
});

module.exports = router;
