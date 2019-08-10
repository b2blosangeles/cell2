(function () { 
  var obj =  function () {
      var _ROOT = this;
      this.socket = null;
      this._clients = {}
      this._sessions = {}
      this._Rsessions = {}
    
      this.getSN = function() {
        _ROOT._SN = (!_ROOT._SN || _ROOT._SN > 9999) ? 1 : (_ROOT._SN + 1)
        return new Date().getTime() + '_' + _ROOT._SN;
      }
    
      this.events = { 
          callbackMessage : function(data, session_id) {
              if (!data || !session_id) return true;
               var s = session_id.split('.');
              _ROOT._Rsessions[s[1]] = function(cbk) {
               //    console.log(s[1] + '--coming----' + session_id);
                   delete _ROOT._Rsessions[s[1]];
                   if (typeof cbk === 'function') cbk(data);
               }
          },
          _incomeMessage_: function(incomeData) {
              console.log('__incomeMessage_');
              console.log(incomeData);
          }
      };
      this.emit = function (k, data, cbk) {
          var me = this;
          var session_id = me.getSN();
          data.session_id  = session_id;
          me.socket.emit(k, data); 
          me.sessionCallback(session_id, cbk);
      };

      this.clientToclient = function ( toClientId, data) { 
         me = this;
         var session_id = me.getSN();
         me.socket.emit('clientRequest', {
                cmd         : 'clientToclient',
                toClient    : toClientId,
                session_id  : session_id,
                data        : {
                        body  : encodeURIComponent(JSON.stringify(data))
                }
           });
      };
      this.sessionCallback = function(session_id, func) {
          me = this;
          var _ITV = setInterval((function (session_id) {
                  return function() {
                        
                        if (typeof _ROOT._Rsessions[session_id] === 'function') {
                    //        console.log('--sessionCallback done --->' + session_id)
                            clearInterval(_ITV);
                            _ROOT._Rsessions[session_id](func);
                            delete _ROOT._Rsessions[session_id];
                        }
                      }
                })(session_id),100);
          setTimeout((function(session_id) {
              return function() {
                    return true;
                    clearInterval(_ITV);
                    if (typeof _ROOT._Rsessions[session_id] === 'function') {
                  //    console.log('--sessionCallback timeout--->' + session_id)
                      // TODO missing call back
                    }
              }
            })(session_id), 6000);      
      }

      this.joinRoom = function (room, func) { 
         me = this;
         me.emit('clientRequest', {
                cmd         : 'joinRoom',
                room        : room
          }, func);
      };

      this.leaveRoom = function (room, func) { 
         me = this;
         me.emit('clientRequest', {cmd : 'leaveRoom', room : room},  func);
      };
    
      this.sendToRoom = function (room, data, clientInfo) { 
         me = this;
         var session_id = me.getSN();
         me.socket.emit('clientRequest', {
                cmd         : 'sendToRoom',
                room        : room,
                session_id  : session_id,
                data        : {
                        code        : 'sendData',
                        clientInfo  : encodeURIComponent(JSON.stringify(clientInfo)),
                        body        : encodeURIComponent(JSON.stringify(data))
                }
              });
      };

      this.setClientInfo = function (v) {
          var me = this;
          me.socket.emit('setClientInfo', encodeURIComponent(JSON.stringify(v)));
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
      this.connection = function(url, cbk) {
        var me = this;
        me.socket = io(url);
        me.setupEvent();
         me.socket.on('uniqueId', function(income_data) {
             me.UUID = income_data;
             console.log(me.UUID);
             if (typeof cbk == 'function') { 
                cbk();
             }  
        });
         me.socket.on('_incomeMessage_', function(income_data) {
              console.log('__incomeMessage_');
              console.log(income_data);
        });
        
        /*
        me.socket.on('connect', function(dd){
        });*/
      }
      this.disConnect = function() {
        var me = this;
      //  me.socket.close();
       // me.socket.emit('disconnect');
      }
    
      this.getRoomClients = function (v, func) {
          var me = this;
      //  console.log('---send getRoomClients--->')
          me.emit('clientRequest', {cmd: 'roomClients', room : v},  func);
      }
    
      this.adminSocketsPool = function (func) {
          var me = this;
      //    console.log('---send adminSocketsPool--->')
          me.emit('clientRequest', {cmd: 'adminSocketsPool'},  func);
      }    
    
      this.getRoomHosts = function (v, func) {
          var me = this;
       // return true;
        
          me.getRoomClients(v, function(data) {
             var list = (!data.data.clients) ? {} : data.data.clients;
             var hosts = {};
             for (var o in  list) {
                  var d = o.split('->');
                  hosts[d[0]] = 1;
             }
             func(Object.keys(hosts));
          });
        
      }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
