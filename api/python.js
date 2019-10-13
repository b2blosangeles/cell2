
var exec = TAO.require('child_process').exec;
var CP = new TAO.pkg.crowdProcess();
var _f = {};
switch((TAO.req.body.code) ? TAO.req.body.code : TAO.req.query.code) {
      case 'version' : 
         exec('pip --version', {maxBuffer: 1024 * 20480},
              function(error, stdout, stderr) {
                 if (error) {
                  TAO.res.send(error.message.replace(/\n/ig, ' '));
                 } else {
                   TAO.res.send(stdout.replace(/\n/ig, ' '));
                 }	
         });    
          break;
      default:  
          _f['python'] = function(cbk) {
               exec('pip list --format=json', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, '++'));
                       } else {
                         cbk(JSON.parse(stdout));
                       }	
               });
          }
          _f['python3'] = function(cbk) {
               exec('pip3 list --format=json', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, '++'));
                       } else {
                         cbk(JSON.parse(stdout));
                       }	
               });
          }
          CP.serial(
               _f,
               function(data) {
                    TAO.res.send({python : CP.data.python, python3 : CP.data.python3});
               }, 6000);
}
          /*
_f['python'] = function(cbk) {
     exec('pip list', {maxBuffer: 1024 * 20480},
          function(error, stdout, stderr) {
             if (error) {
              cbk(error.message.replace(/\n/ig, '++'));
             } else {
               cbk(stdout.replace(/\n/ig, '<br/>'));
             }	
     });
}
_f['python3'] = function(cbk) {
     exec('pip3 list', {maxBuffer: 1024 * 20480},
          function(error, stdout, stderr) {
             if (error) {
              cbk(error.message.replace(/\n/ig, '++'));
             } else {
               cbk(stdout.replace(/\n/ig, '<br/>'));
             }	
     });
}*/

