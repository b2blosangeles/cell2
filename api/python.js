
var exec = TAO.require('child_process').exec;
exec('ls -l', {maxBuffer: 1024 * 2048},
     function(error, stdout, stderr) {
        if (error) {
          TAO.res.send('A-TAO.env');
        } else {
          TAO.res.send('B-TAO.env');
        }	
});
