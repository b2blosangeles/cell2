/*--- Python management ----*/
var shell = new TAO.pkg.commandShell();
// var CP = new TAO.pkg.crowdProcess();
// var _f = {};
let codedir = TAO.env.site_path + '/_ext/python/';
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
            
      case 'submitGithub':
        var vSpaceFolder = devs_path + '/' + vSpace;
        var branch = TAO.req.body.branch;

        var CP = new TAO.pkg.crowdProcess();
        var _f = {};
        _f['vSpace'] = function(cbk) {
            TAO.pkg.fs.stat(vSpaceFolder, function(err) {
                if (!err) {
                    CP.exit = 1;
                    cbk({status : 'failure', errorMessage : 'Virture space ' + vSpace + ' already exists'});
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
             var git = new GitTool(vSpaceFolder);
             var github= (!TAO.req.body.username) ? TAO.req.body.github : git.gitAddAuth(TAO.req.body.github, TAO.req.body.username, TAO.req.body.password);
             git.gitClone(github, function(data) {
                git.gitCheckout(branch, function(data1) {
                    cbk(data);
                })
             }); 
        }  
      this.gitCheckout
        CP.serial(
              _f,
              function(data) {
                  TAO.res.send((!CP.data.clone) ? CP.data.vSpace : CP.data.clone);
              }, 30000);   
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
