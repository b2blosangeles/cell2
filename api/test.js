const { Client } = require(env.site_path + '/api/inc/pg/node_modules/pg');
const client = new Client()

client.connect()

client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
  console.log(err ? err.stack : res.rows[0].message) // Hello World!
  res.send(env);
  client.end()
});
