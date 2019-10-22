var shell = new TAO.pkg.commandShell();
shell.batchExec('cd \/var && pwd && cd \/var\/tao && pwd && python -V && python3 -V', function(data){
    TAO.res.send(data);
});
