const { Client } = require(env.site_path + '/api/inc/pg/node_modules/pg');
const client = new Client()
client.connect((err) => {
  if (err) {
    res.send('ERR');
    // console.error('connection error', err.stack)
  } else {
    res.send('connected');
    // console.log('connected')
  }
})
