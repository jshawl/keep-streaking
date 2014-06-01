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

function user_in_db(user, callback){
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("SELECT * FROM streakers WHERE username = jeresig;", function(err, result) {
      if(err) {
	return console.error('error running query', err);
      }
      if (result.rows.length == 0){ //if user is not in db
	return callback(false);
      }
      return callback(true);
      client.end();
    });
  });
}

router.get('/settings', function(req, res){

  user_in_db( req.params.username, function(  bool ){
    if (bool){
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

    } else {
      res.render('error', {user: req.params.username});
    }
  });
})

module.exports = router;
