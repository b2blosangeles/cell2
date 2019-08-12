(function () { 
    var obj =  function (url) {
        this._Rsessions = {}
        
        this._room = {};
        
        this.events = { 
          callbackMessage : function(data, session_id) {
              alert(777);
              if (!session_id) return true;
               var s = session_id.split('.');
              _ROOT._Rsessions[s[1]] = function(cbk) {
               //    console.log(s[1] + '--coming----' + session_id);
                   delete _ROOT._Rsessions[s[1]];
                   if (typeof cbk === 'function') cbk(data);
               }
          }
        };
        
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
        
        this.emit = function (k, data, cbk) {
            var me = this;
            var session_id = me.getSN();
            data.session_id  = session_id;
            me.socket.emit(k, data); 
            me.sessionCallback(session_id, cbk);
        };

      this.addEvent = function (key, func) {
          var me = this;
          if (key) me.events[key] =  func;  
          if (me.socket) me.setupEvent();
      }
      this.removeEvent = function (key) {
          var me = this;
          if ((key) && (me.socket)) {
                me.socket.off(key);
                delete me.events[key]; 
                me.setupEvent();
          }
      }
        
      this.setupEvent = function () {
        var me = this;
        for (var o in me.events) {
             me.socket.off(o);
             me.socket.on(o, (function(o) { return function(data) {
                  if (typeof me.events[o] === 'function') {
                      me.events[o](data.data, data.session_id);
                  }
             }})(o))
        }   
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
            me.emit('clientRequest', {cmd: 'roomServers'},  func);
        }
        this.sessionCallback = function(session_id, func) {
              me = this;
              var _ITV = setInterval((function (session_id) {
                      return function() {
                            if (typeof me._Rsessions[session_id] === 'function') {
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
                          console.log('--sessionCallback timeout--->' + session_id)
                          // TODO missing call back
                        }
                  }
                })(session_id), 6000);      
          }
        
        this.connection = function(cbk) {
            var me = this;
            me.socket = io(url);
            me.setupEvent();
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
