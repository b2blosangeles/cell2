
(function () {
      var obj =  function (TAO) {
            let me = this;
            
            me.exec = function(cmd, cbk) {
                var { spawn } = TAO.require('child_process');
                var cmda = cmd.split(/[\s]+/), retStr = { data : "", error : ""}, normalClosed = false;
                var ps = spawn(cmda.shift(), cmda, {detached: true});
                ps.stdout.setEncoding('utf8')

                ps.stdout.on('data', (data) => {
                    retStr.data += data;
                });

                ps.stderr.on('data', (data) => {
                     retStr.data += data;
                });

                ps.on('error', (code) => {
                    retStr.error +=  `ps error: ${data}`;
                });
                  
                ps.on('close', (code) => {
                    normalClosed= true
                    if (code !== 0) {
                        retStr.error += `ps process exited with code ${code}`;
                    } 
                    cbk(retStr);
                });

                setTimeout(function() {
                      if (!normalClosed) {
                          //    ps.kill();
                          process.kill(-ps.pid);
                          cbk(retStr);
                      }
                }, 6000)
            }
      };

      if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
      } 

})();
