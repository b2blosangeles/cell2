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

          let sqlStr = (TAO.req.query.code === 'PGtables') ? 'SELECT * FROM pg_catalog.pg_tables; ' 
            : 'SELECT datname FROM pg_database WHERE datistemplate = false; ';
          
          var q_result = {};
          client.query(sqlStr,
              function(err, result) {
                    if(err) {
                      q_result.data  = [];
                    } else {
                      q_result.data = result.rows;
                    }
                    client.end();
                    setTimeout(
                      function() {
                        TAO.res.send(q_result);
                      }, Math.floor(Math.random() * 3 + 3) * 500
                    );
                    
              });
         });
         return true;
         break;
  default:
        TAO.res.send('Missing code!');
        
}


