var elasticsearch = require(env.site_path + '/api/inc/elasticsearch/node_modules/elasticsearch');
var client = new elasticsearch.Client({
  host: 'search-ebiztieprod-ywa24bvy6tjusrpec3dqc3elry.us-west-1.es.amazonaws.com',
  log: 'trace'
});
// 'pgdb.dev.shusiou.win:9200'
// https://search-ebitietest-2fe3gbehhusko6gpdceqbzxnaq.us-west-1.es.amazonaws.com/
/*
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    res.send('elasticsearch cluster is down 32!');
  } else {
    res.send('All is well');
  }
});
*/

try {
  client.search({
    q: 'pant88s'
  }, (err, result) => {
      if (err) res.send(err.message);
      else { 
        res.send(result); 
      }
  });
 // console.logres.send((response.hits.hits)
} catch (error) {
  res.send(error.message)
}
/*
client.search({
  index: 'my-index',
  body: { foo: 'bar' }
}, (err, result) => {
  if (err) res.send(error.message);
  else res.send(result);
})
*/
