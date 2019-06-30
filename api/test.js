var pg = require(env.site_path + '/api/inc/pg/node_modules/pg');
var setting =  require(env.config_path + '/dbSetting.json');

//or native libpq bindings
//var pg = require('pg').native

var prodUrl = setting.dev.PG;
var conString = process.env.ELEPHANTSQL_URL || prodUrl;

// var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    res.send(err.message);
    return true;
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      res.send(err.message);
      return true;
    }
    res.send(result.rows);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

/*
const { Client } = require(env.site_path + '/api/inc/pg/node_modules/pg');
const client = new Client({
  host: 'my.database-server.com',
  port: 5334,
  user: 'database-user',
  password: 'secretpassword!!',
})
client.connect((err) => {
  if (err) {
    res.send(err.message);
    // console.error('connection error', err.stack)
  } else {
    res.send('connected');
    // console.log('connected')
  }
})
*/
