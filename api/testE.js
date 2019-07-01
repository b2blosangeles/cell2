var elasticsearch = require(env.site_path + '/api/inc/elasticsearch/node_modules/elasticsearch');
var client = new elasticsearch.Client({
  host: 'search-ebitietest-2fe3gbehhusko6gpdceqbzxnaq.us-west-1.es.amazonaws.com',
  log: 'trace'
});
// 'pgdb.dev.shusiou.win:9200'
// https://search-ebitietest-2fe3gbehhusko6gpdceqbzxnaq.us-west-1.es.amazonaws.com/
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    res.send('elasticsearch cluster is down 1!');
  } else {
    res.send('All is well');
  }
});
