var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: '首页',layout:'layout' });
    res.render('index', { title: '首页',layout:'layout'});
});

module.exports = router;
