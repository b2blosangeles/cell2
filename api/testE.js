var elasticsearch = require(env.site_path + '/api/inc/elasticsearch/node_modules/elasticsearch');
var client = new elasticsearch.Client({
  host: 'pgdb.dev.shusiou.win:9200',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    res.send('elasticsearch cluster is down!');
  } else {
    res.send('All is well');
  }
});
