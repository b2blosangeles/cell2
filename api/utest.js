delete TAO.require.cache[TAO.env.site_path + '/api/shell.inc.js'];
var SHELL = TAO.require(TAO.env.site_path + '/api/shell.inc.js');
var shell = new TAO.pkg.commandShell(TAO);
shell.exec('pip -V', function(data){
    TAO.res.send(data);
});
