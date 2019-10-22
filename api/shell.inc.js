
(function () {
      var obj =  function (TAO) {
            let me = this;
            
            me.exec = function(cmd, cbk, timeout) {
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
                 //   ((retStr.error) ? retStr.error : []).push(`ps error: ${data}`);
                      ((retStr.error) ? retStr.error : []).push('1');
                });
                  
                ps.on('close', (code) => {
                    normalClosed= true
                    if (code !== 0) {
                    //   ((retStr.error) ? retStr.error : []).push(`ps process exited with code ${code}`);
                          ((retStr.error) ? retStr.error : []).push('2');
                    }
                    retStr.data = {};
                    // resultData = resultData.replace(/^\s+|\s+$/gm,'')
                    try {
                          retStr.data = JSON.parse(resultData);
                    } catch (e) {
                          retStr.data = resultData;
                    }
                    cbk(resultData);
                });

                setTimeout(function() {
                      if (!normalClosed) {
                          //    ps.kill();
                          process.kill(-ps.pid);
                         // ((retStr.error) ? retStr.error : []).push('command timeout');
                            ((retStr.error) ? retStr.error : []).push('3');
                          cbk(retStr);
                      }
                }, 3)
                  // (!timeout) ? 100 :  timeout
            }
      };

      if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
      } 

})();
