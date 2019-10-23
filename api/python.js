/*--- Python management ----*/

var exec = TAO.require('child_process').exec;
const { spawn } = TAO.require('child_process');
var CP = new TAO.pkg.crowdProcess();
var _f = {};
let codedir = TAO.env.site_path + '/_python/';
switch((TAO.req.body.code) ? TAO.req.body.code : TAO.req.query.code) {
      case 'getCodes' :
            TAO.pkg.fs.readdir(codedir, (error, files) => {
                 if (error) {
                   TAO.res.send({error : error.message.replace(/(\n|\r|\t)/gi, ' ')});
                 } else {
                   TAO.res.send(files);
                 }
              });
            break;           
      case 'runCode' :
            var codefn = (TAO.req.body.codeFile) ? TAO.req.body.codeFile : 
                  (TAO.req.query.codeFile) ? TAO.req.query.codeFile : '';
            var pythonType = (TAO.req.body.pythonType) ? TAO.req.body.pythonType : 
                  (TAO.req.query.pythonType) ? TAO.req.query.pythonType : 'python';
            
            if (['python', 'python3'].indexOf(pythonType) === -1) {
                  TAO.res.send({error : 'pythonType error!'});
                  break;
            }
            if (!codefn) {
                  TAO.res.send({error : 'missing codeFile!'});
                  break;
            }
            exec('cd ' + codedir + ' && ' + pythonType + ' ' + codefn, {maxBuffer: 1024 * 20480},
              function(error, stdout, stderr) {
                 if (error) {
                   TAO.res.send({error : error.message.replace(/(\n|\r|\t)/gi, ' ')});
                 } else {
                      setTimeout(
                         function() {
                              TAO.res.send({
                                   pythonType : pythonType,
                                   data: stdout.replace(/(\n|\r|\t)/gi, '')}
                              );
                         }, 100
                      );
                 }	
            }); 

            break;
      case 'getPipVersion' :
          _f['python'] = function(cbk) {
               exec('pip --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(stdout.replace(/(\n|\r|\t)/gi, ''));
                       }	
               });
          }
          _f['python3'] = function(cbk) {
               exec('pip3 --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(stdout.replace(/(\n|\r|\t)/gi, ''));
                       }	
               });
          }
          CP.serial(
               _f,
               function(data) {
                    let ret = {};
                    ret.python = (CP.data.python) ? CP.data.python : null;
                    ret.python3 = (CP.data.python3) ? CP.data.python3 : null;
                    TAO.res.send(ret);
               }, 6000);   
          break;
      case 'getPythonVersion' :
          _f['python'] = function(cbk) {

               exec('python -V', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                         if (error) {
                              cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                         } else {
                              cbk(stdout.replace(/(\n|\r|\t)/gi, ''));
                         }	
               });
          }
          /*
          _f['python3'] = function(cbk) {
               exec('python3 --version && python --version', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(stdout.replace(/(\n|\r|\t)/gi, ''));
                       }	
               });
          }*/
          CP.serial(
               _f,
               function(data) {
                    let ret = {};
                    ret.python = (CP.data.python) ? CP.data.python : null;
                    ret.python3 = (CP.data.python3) ? CP.data.python3 : null;
                    TAO.res.send(data);
               }, 6000);   
          break;
      case 'getPipVersion' : 
          var shell = new TAO.pkg.commandShell();
          shell.run('pip --version && pip3 --version', function(data){
                let ret = {};
                ret.python = (data.results.P_0.status === 'success') ? data.results.P_0.data : '';
                ret.python3 = (data.results.P_1.status === 'success') ? data.results.P_1.data : '';
                TAO.res.send(ret);
            });
          break;
      case 'getPackages' : 
          var shell = new TAO.pkg.commandShell();
          shell.run('pip list  --format=json && pip3 list  --format=json', function(data){
                let ret = {};
                ret.python = (data.results.P_0.status === 'success') ? data.results.P_0.data : [];
                ret.python3 = (data.results.P_1.status === 'success') ? data.results.P_1.data : [];
                TAO.res.send(ret);
            });
          break;
      default:
         TAO.res.send({error: 'Missing or wrong code!'});
}
