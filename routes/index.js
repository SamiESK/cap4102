var express = require('express');
var router = express.Router();
var path = require('path');
   

router.get('/order', function(req, res, next) {
  res.sendFile(  path.join(__dirname, '..','public', 'order.html'));

});
router.get('/timeline', function(req, res, next) {
  res.sendFile(  path.join(__dirname, '..','public', 'timeline.html'));
});
router.get('/', function(req, res, next) {
  res.sendFile(  path.join(__dirname, '..','public', 'index.html'));
});
module.exports = router;
