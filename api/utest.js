delete TAO.require.cache[TAO.env.site_path + '/api/shell.inc.js'];
var SHELL = TAO.require(TAO.env.site_path + '/api/shell.inc.js');
var shell = new TAO.pkg.commandShell();
shell.exec('ls -l', function(data){
    TAO.res.send(data);
});
