delete TAO.require.cache[TAO.env.site_path + '/api/shell.inc.js'];
var SHELL = TAO.require(TAO.env.site_path + '/api/shell.inc.js');
var shell = new SHELL(TAO);
shell.exec('python --version', function(data){
    TAO.res.send(data);
});
