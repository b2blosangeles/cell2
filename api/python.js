/*--- Python management ----*/
var shell = new TAO.pkg.commandShell();
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

            shell.run('cd ' + codedir + ' && ' + pythonType + ' ' + codefn, function(data){
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
