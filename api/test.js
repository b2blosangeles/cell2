var pg = require(env.site_path + '/api/inc/pg/node_modules/pg');
var setting =  require(env.config_path + '/dbSetting.json');

var client = new pg.Client(setting.dev.PG);
client.connect(function(err) {
  if(err) {
    res.send(err.message);
    return true;
  }
  let sqlStr1 = 'SELECT datname FROM pg_database WHERE datistemplate = false; ';
  let sqlStr2 = 'SELECT * FROM pg_catalog.pg_tables; ';
   //   'SELECT * FROM pg_catalog.pg_tables; ';
  // SELECT * FROM pg_catalog.pg_tables;
  // SELECT datname FROM pg_database WHERE datistemplate = false;
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
                        res.send(q_result);
                  });
             });
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

pg.connect(pgConString, function (err, client, done) {
    if (err) {
        callBack("DB connection failed. " + err, null);
        return;
    }
    client.query({
        text: "INSERT INTO COMPANY (ID,NAME) VALUES (1, 'Paul');",
        values: [1, "Poul1"],
        name: "insertQuery"
    });

    client.query({
        text: "DELETE FROM  COMPANY WHERE ID='12';",
        name: "deleteQuery"
    });

    client.on("error", function (err) {
        callBack("DB insertion failed. Error Message: " + err, null);
        return;
    });


});
*/
