var pg = require(env.site_path + '/api/inc/pg/node_modules/pg');
var setting =  require(env.config_path + '/dbSetting.json');

var client = new pg.Client(setting.dev.PG);
client.connect(function(err) {
  if(err) {
    res.send(err.message);
    return true;
  }
  let sqlStr = 'SELECT datname FROM pg_database WHERE datistemplate = false'; 
  // SELECT * FROM pg_catalog.pg_tables;
  // SELECT datname FROM pg_database WHERE datistemplate = false;
  client.query(sqlStr,
      function(err, result) {
            if(err) {
              res.send(err.message);
              return true;
            }
            res.send(result.rows);
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
