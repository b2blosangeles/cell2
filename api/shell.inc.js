
(function () {
      var obj =  function (TAO) {
            let me = this;
            
            me.exec = function(cmd, cbk) {
                var { spawn } = TAO.require('child_process');
                var cmda = cmd.split(/[\s]+/), retStr = {}, normalClosed = false, resultData = '';
                var ps = spawn(cmda.shift(), cmda, {detached: true});
                ps.stdout.setEncoding('utf8')

                ps.stdout.on('data', (data) => {
                    resultData  += data;
                });

                ps.stderr.on('data', (data) => {
                      resultData  += data;
                });

                ps.on('error', (code) => {
                    retStr.error +=   ((retStr.error) ? retStr.error : []).push(`ps error: ${data}`);
                });
                  
                ps.on('close', (code) => {
                    normalClosed= true
                    if (code !== 0) {
                        retStr.error += ((retStr.error) ? retStr.error : []).push(`ps process exited with code ${code}`);
                    }
                    retStr.data = {};
                    try {
                          retStr.data = JSON.parse(resultData);
                    } catch (e) {
                          
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
