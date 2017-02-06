let express = require('express');
let router  = express.Router();


router.get('/', (req, res) => {
  res.json({"test user 1":4, "test user 3": 51, "random number from backend":Math.random()*4});
});

module.exports = router;
