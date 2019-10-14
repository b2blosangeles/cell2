/*--- Python management ----*/
var exec = TAO.require('child_process').exec;
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
                  (TAO.req.query.codeFile) ? TAO.req.query.codeFile : 'test.py';
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
                   TAO.res.send(stdout.replace(/(\n|\r|\t)/gi, ''));
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
          _f['python3'] = function(cbk) {
               exec('python3 --version', {maxBuffer: 1024 * 20480},
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
                    TAO.res.send(data);
               }, 6000);   
          break;
      case 'getPackages' : 
          _f['python'] = function(cbk) {
               exec('pip list --format=json', {maxBuffer: 1024 * 2048},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(JSON.parse(stdout));
                       }	
               });
          }
          _f['python3'] = function(cbk) {
               exec('pip3 list --format=json', {maxBuffer: 1024 * 20480},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(JSON.parse(stdout));
                       }	
               });
          }
          CP.parallel(
               _f,
               function(data) {
                    let ret = {};
                    ret.python = (CP.data.python) ? CP.data.python : null;
                    ret.python3 = (CP.data.python3) ? CP.data.python3 : null;
                    TAO.res.send(ret);
               }, 6000);
          break;
      default:
         TAO.res.send({error: 'Missing or wrong code!'});
}
