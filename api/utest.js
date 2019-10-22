var SHELL = TAO.require(TAO.env.site_path + '/api/shell.inc.js');
var shell = new SHELL(TAO);
shell.exec('python -V', function(data){
    TAO.res.send(data);
});
