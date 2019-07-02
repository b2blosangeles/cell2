var elasticsearch = TAO.require(TAO.env.root_path + '/vendor/elasticsearch/node_modules/elasticsearch');
var setting =  TAO.require(TAO.env.config_path + '/dbSetting.json');

TAO.res.send(setting.dev.elasticsearch);
return true;

var client = new elasticsearch.Client({
  host: setting.dev.elasticsearch,
  log: 'trace'
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
