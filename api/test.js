const { Pool, Client } = require(env.site_path + '/api/inc/pg/node_modules/pg');
const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
})

pool.query('SELECT NOW()', (err, res) => {
  // console.log(err, res)
  res.send('ERR');
  pool.end()
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  // console.log(err, res)
  res.send('ERR S');
  client.end()
})
