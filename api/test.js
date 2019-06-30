const { Client } = require(env.site_path + '/api/inc/pg/node_modules/pg');

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  // console.log(err, res)
  res.send('env');
  client.end()
});
