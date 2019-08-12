(function () { 
    var obj =  function (url) {
        this._Rsessions = {}
        
        this._room = {};
        this.trigger = {
            roomServers : function(data) {
                 console.log('_incomeMessage_ coming---->>222>>');
                 console.log(data)    
            }
        };
        
        
        this.getSN = function() {
            var me = this;
            me._SN = (!me._SN || me._SN > 9999) ? 1 : (me._SN + 1)
            return new Date().getTime() + '_' + me._SN;
        }        
        
        this.joinRoom = function (room, func) {
            var me = this;
            me.getCommServers(function(list) {
                me._room[room] = list[Math.floor(Math.random() * list.length)];
                func(me._room);
            });
        }        
        this.getCommServers = function (func) {
            var me = this;
            me.socket.emit('clientRequest', {cmd: 'roomServers'},  func);
        }
        this.sessionCallback = function(session_id, func) {
              me = this;
              var _ITV = setInterval((function (session_id) {
                      return function() {

                            if (typeof me._Rsessions[session_id] === 'function') {
                        //        console.log('--sessionCallback done --->' + session_id)
                                clearInterval(_ITV);
                                me._Rsessions[session_id](func);
                                delete me._Rsessions[session_id];
                            }
                          }
                    })(session_id),100);
            
              setTimeout((function(session_id) {
                  return function() {
                        return true;
                        clearInterval(_ITV);
                        if (typeof me._Rsessions[session_id] === 'function') {
                      //    console.log('--sessionCallback timeout--->' + session_id)
                          // TODO missing call back
                        }
                  }
                })(session_id), 6000);      
          }
        
        this.connection = function(cbk) {
            var me = this;
            me.socket = io(url);
            me.socket.on('_incomeMessage_', function(income_data) {
                if ((income_data) && (income_data.code) && (me.trigger[income_data.code]) && (typeof me.trigger[income_data.code] === 'function')) {
                    me.trigger[income_data.code](income_data);
                } else {
                    console.log('incomeMessage coming--->');
                    console.log(income_data)      
                }
            });          
            
            me.socket.on('connect', function() {
                if (typeof cbk === 'function') { 
                    cbk();
                } 
            });  
            me.socket.on('disconnect', function(reason) {
                console.log('IO disconnected :: ' + reason);
            }); 

        }
    }   
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = obj;
    } else {
        window.TSocketClient = obj; 
    }
})();
