/*--- Python management ----*/
var shell = new TAO.pkg.commandShell();
// var CP = new TAO.pkg.crowdProcess();
// var _f = {};
let codedir = TAO.env.site_path + '/_ext/python/';
switch((TAO.req.body.code) ? TAO.req.body.code : TAO.req.query.code) {
      case 'getCodes' :
            var list = []
            TAO.pkg.fs.readdir(codedir, (error, files) => {
                 if (error) {
                   TAO.res.send({error : error.message.replace(/(\n|\r|\t)/gi, ' ')});
                 } else {
                   for (var i=0; i < files.length; i++) {
                        if (files[i].match(/\.py$/i)) {
                              list.push(files[i]);
                        }
                   }
                   TAO.res.send(list);
                 }
              });
            break;
            
      case 'submitGithub':
            var vCodeFolder = TAO.env.site_path + '/_ext/python';
            var branch = TAO.req.body.branch;

            var CP = new TAO.pkg.crowdProcess();
            var _f = {};
            _f['vSpace'] = function(cbk) {
                  TAO.pkg.fs.stat(vCodeFolder, function(err) {
                      if (!err) {
                          CP.exit = 1;
                          cbk({status : 'failure', errorMessage : 'code folder ' +  vCodeFolder + ' already exists'});
                      } else if (err.code === 'ENOENT') {
                          cbk({status : 'success'});
                      } else {
                           CP.exit = 1;
                           cbk({status : 'failure', errorMessage : 'API error!'});
                      }
                  });
            }
            _f['clone'] = function(cbk) {
                   var GitTool = TAO.require(TAO.env.root_path + '/package/gitTool/gitTool.js');
                   var git = new GitTool(vCodeFolder);
                   var github= (!TAO.req.body.username) ? TAO.req.body.github : git.gitAddAuth(TAO.req.body.github, TAO.req.body.username, TAO.req.body.password);
                   git.gitClone(github, function(data) {
                      git.gitCheckout(branch, function(data1) {
                          cbk(data);
                      })
                   }); 
            }  
            CP.serial(
              _f,
              function(data) {
                  TAO.res.send((!CP.data.clone) ? CP.data.vSpace : CP.data.clone);
              }, 30000);   
            break;  
      case 'refreshCode':
              var vCodeFolder = TAO.env.site_path + '/_ext/python';
              TAO.pkg.fs.stat(vCodeFolder, function(err) {
                  if (err) {
                         TAO.res.send({status : 'failure', errorMessage : err.message});
                  } else {
                      var cmd = 'cd ' + vCodeFolder + ' && git pull ';
                      TAO.pkg.exec(cmd, function(error, stdout, stderr) {
                          if (!error) {
                              TAO.res.send({status : 'success'});
                          } else {
                              TAO.res.send({status : 'failure', errorMessage : error.message});
                          }
                      });  
                  }
              })   
              break; 
       case 'removeCodeFolder':
              var vCodeFolder = TAO.env.site_path + '/_ext/python';
              TAO.pkg.fs.stat(vCodeFolder, function(err) {
                  if (err) {
                         TAO.res.send({status : 'failure', errorMessage : err.message});
                  } else {
                      var cmd = 'rm -fr ' + vCodeFolder;
                      TAO.pkg.exec(cmd, function(error, stdout, stderr) {
                          if (!error) {
                              TAO.res.send({status : 'success'});
                          } else {
                              TAO.res.send({status : 'failure', errorMessage : error.message});
                          }
                      });  
                  }

              })   
              break; 
      case 'getRemoteBranches':
            var GitTool = TAO.require(TAO.env.root_path + '/package/gitTool/gitTool.js');
            var git = new GitTool('');

            var gitUrl = (!TAO.req.body.username) ? TAO.req.body.gitUrl : git.gitAddAuth(TAO.req.body.gitUrl, TAO.req.body.username, TAO.req.body.password);

            git.getRemoteBranches(gitUrl, function(data) {
                  TAO.res.send(data);
            });
            break;
      case 'runCode' :
            var codefn = (TAO.req.body.codeFile) ? TAO.req.body.codeFile : 
                  (TAO.req.query.codeFile) ? TAO.req.query.codeFile : '';
           var params = (TAO.req.body.params) ? TAO.req.body.params : 
                  (TAO.req.query.params) ? TAO.req.query.params : '';
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

            shell.run('cd ' + codedir + ' && ' + pythonType + ' ' + codefn + ' ' + params, function(data){
               if (data.results.P_1.status !== 'success') {
                   TAO.res.send({error : data.results.P_1.errorMessage.join('; ')});
               } else {
                  TAO.res.send({
                       pythonType : pythonType,
                       data: data.results.P_1.data
                  });
               }
            });
            // .replace(/(\n|\r|\t)/gi, '')}
            break;
            
      case 'getPythonVersion' : 
          shell.run('python --version && python3 --version', function(data){
                let ret = {};
                ret.python = (data.results.P_0.status === 'success') ? data.results.P_0.data : '';
                ret.python3 = (data.results.P_1.status === 'success') ? data.results.P_1.data : '';
                TAO.res.send(ret);
            });
          break;
            
      case 'getPipVersion' : 
          shell.run('pip --version && pip3 --version', function(data){
                let ret = {};
                ret.python = (data.results.P_0.status === 'success') ? data.results.P_0.data : '';
                ret.python3 = (data.results.P_1.status === 'success') ? data.results.P_1.data : '';
                TAO.res.send(ret);
            });
          break;
            
      case 'getPackages' : 
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
