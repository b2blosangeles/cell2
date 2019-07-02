delete TAO.require.cache[TAO.env.root_path + '/vendor/elasticsearch/node_modules/elasticsearch'];
var elasticsearch = TAO.require(TAO.env.root_path + '/vendor/elasticsearch/node_modules/elasticsearch');

delete TAO.require.cache[TAO.env.config_path + '/dbSetting.json'];
var setting =  TAO.require(TAO.env.config_path + '/dbSetting.json');

var client = new elasticsearch.Client({
  host: setting.dev.elasticsearch,
  requestTimeout: 6000
});

try {
  client.search({
    q: 'san francisco'
  }, (err, result) => {
      if (err) TAO.res.send(err.message);
      else { 
        TAO.res.send(result); 
      }
  });
 // console.logres.send((response.hits.hits)
} catch (error) {
  TAO.res.send(error.message)
}
