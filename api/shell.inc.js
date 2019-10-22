
(function () {
      var obj =  function (env, pkg, _pool, server, isSSL) {
            let me = this;
            
            me.exec = function(cmd) {
                var { spawn } = require('child_process');
                var cmda = cmd.split(/[\s]+/), retStr = { data : "", error : "" };
                var ps = spawn(cmda.shift(), cmda, {detached: true});
                ps.stdout.setEncoding('utf8')

                ps.stdout.on('data', (data) => {
                    retStr.data += data;
                });

                ps.stderr.on('data', (data) => {
                    retStr.error +=  `ps stderr: ${data}`;
                });

                ps.on('close', (code) => {
                    retStr.closed = true
                    if (code !== 0) {
                        retStr.error += `ps process exited with code ${code}`;
                    } else {
                        retStr.data = JSON.parse(retStr.data);
                    }
                });

                setTimeout(function() {
                if (!retStr.closed) {
                    //    ps.kill();
                    process.kill(-ps.pid);
                }
                }, 1000)
            }
      };

      if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
      } 

})();
