
const { Pool } = require(env.site_path + '/api/inc/pg/node_modules/pg');

const pool = new Pool()

pool.connect((err, client, release) => {
  if (err) {
    res.send('ERR');
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      res.send('ERR A');
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})
  client.end()
})
