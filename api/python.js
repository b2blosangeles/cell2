
var exec = TAO.require('child_process').exec;
var CP = new TAO.pkg.crowdProcess();
var _f = {};
switch((TAO.req.body.code) ? TAO.req.body.code : TAO.req.query.code) {
      case 'PipVersion' :
          _f['python'] = function(cbk) {
               exec('pip --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, ' '));
                       } else {
                         cbk(stdout.replace(/\n/ig, ''));
                       }	
               });
          }
          _f['python3'] = function(cbk) {
               exec('pip3 --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, ''));
                       } else {
                         cbk(stdout.replace(/\n/ig, ''));
                       }	
               });
          }
          CP.serial(
               _f,
               function(data) {
                    TAO.res.send({python : CP.data.python, python3 : CP.data.python3});
               }, 6000);   
          break;
      case 'PythonVersion' :
          _f['python'] = function(cbk) {
               exec('python --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, ' '));
                       } else {
                         cbk(stdout.replace(/\n/ig, ''));
                       }	
               });
          }
          _f['python3'] = function(cbk) {
               exec('python3 --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/\n/ig, ''));
                       } else {
                         cbk(stdout.replace(/\n/ig, ''));
                       }	
               });
          }
          CP.serial(
               _f,
               function(data) {
                    TAO.res.send({python : CP.data.python, python3 : CP.data.python3});
               }, 6000);   
          break;
      case 'getPackages' : 
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
          break;
      default:
         TAO.res.send({error: 'Missing or wrong code!'});
}
