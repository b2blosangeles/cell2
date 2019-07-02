delete TAO.require.cache[TAO.env.root_path + '/vendor/pg/node_modules/pg'];
var pg = TAO.require(TAO.env.root_path + '/vendor/pg/node_modules/pg');

delete TAO.require.cache[TAO.env.config_path + '/dbSetting.json'];
var setting =  TAO.require(TAO.env.config_path + '/dbSetting.json');

setting.dev.PG_evergreen.connectionTimeoutMillis = 6000;

var client = new pg.Client(setting.dev.PG_evergreen);

client.connect(function(err) {
  if(err) {
    TAO.res.send(err.message);
    return true;
  }
  let sqlStr1 = 'SELECT datname FROM pg_database WHERE datistemplate = false; ';
  let sqlStr2 = 'SELECT * FROM pg_catalog.pg_tables; ';

  let q_result = {};
  client.query(sqlStr1,
      function(err, result) {
            if(err) {
              q_result.i0 = err.message;
            } else {
              q_result.i0 = result.rows;
            }
            client.query(sqlStr2,
                  function(err, result) {
                        if(err) {
                          q_result.i1 = err.message;
                          return true;
                        }
                        q_result.i1 = result.rows;
                        client.end();
                        TAO.res.send(q_result);
              });
      });
 });
