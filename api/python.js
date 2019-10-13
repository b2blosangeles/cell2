
var exec = TAO.require('child_process').exec;
exec('ls -l', {maxBuffer: 1024 * 2048},
     function(error, stdout, stderr) {
        if (error) {
          TAO.res.send(stdout.replace(/\n/ig, '++'));
        } else {
          TAO.res.send(stdout.replace(/\n/ig, '++'));
        }	
});
