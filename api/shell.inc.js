(function () {
	var obj =  function (env, pkg, _pool, server, isSSL) {
      let me = this;
      me.exec = function(cmd) {
        var { spawn } = require('child_process');
        var cmda = cmd.split(/[\s]+/), retStr = '';
        var ps = spawn(cmda.shift(), cmda, {detached: true});
        ps.stdout.setEncoding('utf8')
        
        ps.stdout.on('data', (data) => {
            retStr += data;
        });
        
        ps.stderr.on('data', (data) => {
          console.log(`ps stderr: ${data}`);
        });
        
        ps.on('close', (code) => {
          if (code !== 0) {
            console.log(`ps process exited with code ${code}`);
            
          }
          console.log(retStr);
        });
        
        setTimeout(
          function() {
        //    ps.kill();
            process.kill(-ps.pid);
          }, 1000
        )
      }
	};
	
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = obj;
	} 
	
})();
