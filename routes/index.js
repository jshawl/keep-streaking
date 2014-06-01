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
      title: 'Keep Streaking'
    });
    req.session.sendemails = "no";
});

function user_in_db(user, callback){
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("SELECT * FROM streakers WHERE username = 'jeresig';", function(err, result) {
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
  //sendemails? =  select sendemail where username == session.username;
  res.render('settings', { sendemails: req.session.sendemails });
});

router.get('/stop', function( req, res ) {
  // update user 1/0 send emails? false
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("UPDATE streakers SET sendemails = '0' WHERE username = 'jeresig';", function(err, result) {
      if(err) {
	return console.error('error running query', err);
      }
      client.end();
    });
  });
  req.session.sendemails = "no";
  res.redirect('/settings');
});

router.get('/start', function( req, res ) {
  var client = new pg.Client(conString);
  client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query("UPDATE streakers SET sendemails = '1' WHERE username = 'jeresig';", function(err, result) {
      if(err) {
	return console.error('error running query', err);
      }
      client.end();
    });
  });
  req.session.sendemails = "yes";
  res.redirect('/settings');
});


module.exports = router;


