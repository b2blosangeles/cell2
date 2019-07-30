(function () { 
  var obj =  function () {
      var _ROOT = this;
      this.socket = null;
      this._clients = {}
      this._sessions = {}
      this._Rsessions = {}
    
      this.getSN = function() {
        _ROOT._SN = (!_ROOT._SN || _ROOT._SN > 9999) ? 1 : (_ROOT._SN + 1)
        return '' + _ROOT._SN;
      }
    
      this.events = { 
          callbackMessage : function(data, session_id) {
              if (!data || !session_id) return true;
            
               console.log('===>>>' + session_id);
               var s = session_id.split('.');
              _ROOT._Rsessions[s[1]] = function(cbk) {
                console.log(3344);
                   delete _ROOT._Rsessions[s[1]];
                   if (typeof cbk === 'function') cbk(data);
               }
              console.log( _ROOT._Rsessions);
          },
          roomCilents : function(data, session_id){
            /*the 
              if (!data || !session_id) return true;
              var s = session_id.split('.')
              _ROOT._sessions[s[1]] = function(cbk) {
                    var room = data.room, clients = (!data.clients) ? {} : data.clients;
                    for (o in clients) {
                        try {
                         clients[o] = (clients[o]) ?  JSON.parse(decodeURIComponent(clients[o])) : {};
                        } catch (e) {}
                    }
                    _ROOT._clients[room] = clients;
                   delete _ROOT._sessions[s[1]];
                   if (typeof cbk === 'function') cbk(data);
               }
               */
          }
      };
      this.emit = function (k, data) {
        var me = this;
        me.socket.emit(k, data); 
      };

      this.sendToClient = function ( toClientId, data) { 
         me = this;
        
         var session_id = me.getSN();
         me.socket.emit('clientRequest', {
                cmd         : 'sendToClient',
                toClient    : toClientId,
                session_id  : session_id,
                data        : {
                        body  : encodeURIComponent(JSON.stringify(data))
                }
           });
      };
      this.sessionCallback = function(session_id, func) {
          me = this;
        console.log('===AAA===='+session_id);
          var _ITV = setInterval(function () {
                  if (typeof _ROOT._Rsessions[session_id] === 'function') {
                    console.log("==BBBB===>" + session_id)
                      clearInterval(_ITV);
                      _ROOT._Rsessions[session_id](func);
                      delete _ROOT._Rsessions[session_id];
                  } else {
                    console.log('===ACCC====');
                  }
                },50);
          setTimeout(function() {
              clearInterval(_ITV);
              console.log('---->>---timeout');
            }, 6000);      
      }

      this.joinRoom = function (room, func) { 
         me = this;
         var session_id = me.getSN();
   
         me.socket.emit('clientRequest', {
                cmd         : 'joinRoom',
                room        : room,
                session_id  : session_id
          });
      
          me.sessionCallback(session_id, func);
      };

      this.leaveRoom = function (room, func) { 
         me = this;
         var session_id = me.getSN();
         me.socket.emit('clientRequest', {
                cmd         : 'leaveRoom',
                room        : room,
                session_id  : session_id
              });
        this.sessionCallback(session_id, func)
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
        });/*
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
          var session_id = me.getSN();
          me.emit('clientRequest', {cmd: 'roomClients', room : v, session_id : session_id});
        //  var cp = new crowdProcess(), _f = {};
        //  me.emit('clientRequest', {cmd: 'roomClients', room : v, session_id : session_id});
          var _ITV = setInterval(function () {
                  if (typeof _ROOT._sessions[session_id] === 'function') {
                      clearInterval(_ITV);
                      _ROOT._sessions[session_id](func);
                  }
                },50);
          setTimeout(function() {
              clearInterval(_ITV);
          
            }, 6000);
      }
      this.getRoomHosts = function (v, func) {
          var me = this;
          me.getRoomClients(v, function(data) {
             var list = (!data.clients) ? {} : data.clients;
             var hosts = {};
             for (var o in  list) {
                  var d = o.split('_');
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
