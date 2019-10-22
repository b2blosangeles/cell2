var shell = new TAO.pkg.commandShell();
shell.exec('pythonP -V', function(data){
    TAO.res.send(data);
});
