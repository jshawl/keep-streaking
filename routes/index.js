var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var strftime = require('strftime');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
      title: 'Keep Streaking'});
});

router.get('/:username', function(req, res){
  url = 'https://github.com/' + req.params.username;
  request(url, function(err, resp, body){
    $ = cheerio.load( body );
    num = $('.contrib-streak-current .num').text();
    last_day = $('.contrib-streak-current').text().split('-')[1].replace(/(?!\w)[\x00-\xC0]/g, '');
    today = strftime('%B%d').replace(/(?!\w)[\x00-\xC0]/g, '');
    is_today = today == last_day ? true : false;
    res.render('streaker', { 
      title: 'Keep Streaking',
      current_streak: num,
      user: req.params.username,
      is_today: is_today });
    });
})

module.exports = router;
