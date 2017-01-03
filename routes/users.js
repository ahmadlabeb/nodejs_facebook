var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/detail', function(req, res, next) {
    res.send('details');
});
// login-nodejs.ps:3000/users/detail
module.exports = router;
