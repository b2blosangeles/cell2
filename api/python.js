/*--- Python management ----*/

/*

const { spawn } = require('child_process');
const ps = spawn('python', ['test2.py'], {detached: true});

ps.stdout.setEncoding('utf8')

ps.stdout.on('data', (data) => {
    console.log('--niu-->');
    console.log('使用spawn方法输出: ' + data);
  // console.log(data);
});

ps.stderr.on('data', (data) => {
  console.log(`ps stderr: ${data}`);
});

ps.on('close', (code) => {
  if (code !== 0) {
    console.log(`ps process exited with code ${code}`);
  }
});

setTimeout(
  function() {
    ps.kill();
//    process.kill(-ps.pid);
  }, 1000
)

*/
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
      case 'getPackages' : 
          _f['python'] = function(cbk) {
             
               let ps = spawn('pip', ['list', '--format=json'], {detached: true});
               ps.stdout.setEncoding('utf8')
                var retStr = '';
                ps.stdout.on('data', (data) => {
                    retStr += data;
                });

                ps.stderr.on('data', (data) => {
                     cbk(data.replace(/(\n|\r|\t)/gi, ' '));
                });

                ps.on('close', (code) => {
                    cbk(JSON.parse(retStr));
                });
                /*
               exec('pip list --format=json', {maxBuffer: 1024 * 2048},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(JSON.parse(stdout));
                       }	
               });*/
          }
          _f['python3'] = function(cbk) {
               exec('pip3 list --format=json', {maxBuffer: 1024 * 2048},
                    function(error, stdout, stderr) {
                       if (error) {
                        cbk(error.message.replace(/(\n|\r|\t)/gi, ' '));
                       } else {
                         cbk(JSON.parse(stdout));
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
               }, 12000);
          break;
      default:
         TAO.res.send({error: 'Missing or wrong code!'});
}
