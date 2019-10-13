
var exec = TAO.require('child_process').exec;
exec('pip3 list', {maxBuffer: 1024 * 20480},
     function(error, stdout, stderr) {
        if (error) {
          TAO.res.send(stdout.replace(/\n/ig, '++'));
        } else {
          TAO.res.send(stdout.replace(/\n/ig, '<br/>'));
        }	
});
