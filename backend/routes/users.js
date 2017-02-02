let models  = require('../models');
let express = require('express');
let router  = express.Router();


router.get('/', (req, res) => {
  models.User.findAll()
    .then((users) => {
    res.json(users);
  });
});

module.exports = router;
