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
