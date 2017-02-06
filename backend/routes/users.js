let express = require('express');
let router  = express.Router();
let User = require('../models/user');
let jwt = require('jsonwebtoken');
let config = require('../config');
router.get('/', (req, res) => {
  User.find(function(err, threads) {
    res.json(threads);
  });
});

router.post('/signup', (req, res) => {
  //temp
  console.log(req.body);
  if(req.body.username==null) {
    res.json('error username required');
    return;
  }
  new User({username: req.body.username}).save((err, user) => {
    if(err) res.json(err);
    let token = jwt.sign({ id: user._id }, config.JWT_SECRET);
    res.json({id: user._id, token});
  });
});

module.exports = router;
