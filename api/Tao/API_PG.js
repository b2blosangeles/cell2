switch( TAO.req.query.code) {
  case 'PGtables':
  case 'PGdatabases':
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

          let sqlStr = 'SELECT * FROM pg_catalog.pg_tables; ';

          let q_result = {};
          client.query(sqlStr,
              function(err, result) {
                    if(err) {
                      q_result.data  = [];
                    } else {
                      q_result.data = result.rows;
                    }
                    client.end();
                    TAO.res.send(q_result);
              });
         });
    break;
  default:
        TAO.res.send('Missing code!');
        return true;
}


