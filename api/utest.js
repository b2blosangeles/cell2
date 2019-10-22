var shell = new TAO.pkg.commandShell();
shell.batchExec('python3 -V', function(data){
    TAO.res.send(data);
});
