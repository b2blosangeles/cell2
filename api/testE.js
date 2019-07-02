var elasticsearch = TAO.require(env.root_path + '/vendor/elasticsearch/node_modules/elasticsearch');
var setting =  TAO.require(env.config_path + '/dbSetting.json');

// res.send(setting.dev.elasticsearch);
// return true;

var client = new elasticsearch.Client({
  host: setting.dev.elasticsearch,
  log: 'trace'
});

try {
  client.search({
    q: 'san francisco'
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
