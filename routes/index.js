var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var strftime = require('strftime');
var pg = require('pg'); 
var conString = "postgres://keepstreaking:keepstreaking@localhost/keepstreaking";


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { 
      title: 'Keep Streaking'});
});

router.get('/:username', function(req, res){
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("SELECT * FROM streakers WHERE username = '"+ req.params.username +"';", function(err, result) {
      if(err) {
	return console.error('error running query', err);
      }
      console.log(result.rows);
      if (result.rows.length == 0){
        res.render('error', {user: req.params.username }); 
      }
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      client.end();
    });
  });
  url = 'https://github.com/' + req.params.username;
  request(url, function(err, resp, body){
    $ = cheerio.load( body );
    num = $('.contrib-streak-current .num').text();
    console.log(num);
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
