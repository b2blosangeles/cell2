var shell = new TAO.pkg.commandShell();
shell.exec('python -V', function(data){
    TAO.res.send(data);
});
