var express = require('express');
var router = express.Router();

const db = require('../data/db');
const redis = require('redis');

/* GET home page. */
router.get('/', function(req, res, next) {

  let client = redis.createClient(6379, '127.0.0.1', {});
  client.get('RECENT', async function(err, value)
  {
    res.render('index', { recentFlag: getFlag(value), title: 'meow.io', recentUploads: await db.recentCats(5), bestFacts: (await db.votes()).slice(0,100) });
    client.quit();
  });
});

function getFlag(value)
{
  // force undefined flags to be OFF.
  if( value == undefined)
    return false;
  if( value == 'ON' )
    return true;
  if( value == 'OFF')
    return false;
  // any other value is automatically off.
  return false;
}

module.exports = router;
