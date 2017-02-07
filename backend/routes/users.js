let express = require('express');
let router  = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken');
let config = require('../config');
router.get('/', (req, res) => {
  User.find((err, threads) => {
    res.json(threads);
  });
});

router.post('/signup', (req, res) => {
  //temp
  // console.log(req.body);
  let username = req.body.username;
  if(username==null) {
    res.json('error username required');
    return;
  }
  //todo: check for unique
  new User({username}).save((err, user) => {
    if(err) res.json(err);
    let token = jwt.sign({ id: user._id }, config.JWT_SECRET);
    res.json({id: user._id, token, username});
  });
});

module.exports = router;
