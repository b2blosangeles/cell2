var SHELL = TAO.require(TAO.env.site_path + '/shell.inc.js');
var shell = new SHELL();
shell.exec('python -V', function(data){
    TAO.res.send(data);
});
