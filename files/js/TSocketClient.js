(function () { 
  var obj =  function () {
      var _ROOT = this;
      this.socket = null;
      this._clients = {}
      this._sessions = {}
      this.events = { 
        roomCilents : function(data){
            if (!data || !data.session_id) return true;
             _ROOT._sessions[data.session_id] = function() {
                  console.log(data);
                  var room = data.room, clients = (!data.clients) ? {} : data.clients;
                      for (o in clients) {
                           clients[o] = (clients[o]) ?  JSON.parse(decodeURIComponent(clients[o])) : {};
                      }
                      _ROOT._clients[room] = clients;
                      console.log( _ROOT._clients);
                  }
                  delete _ROOT._sessions[data.session_id];
             }

      };
    
      this.emit = function (k, data) {
        var me = this;
        me.socket.emit(k, data); 
      }

      this.joinRoom = function (room, clientInfo) { 
         me = this;
         me.socket.emit('clientRequest', {
                cmd         : 'sendToRoom',
                room        : room,
                data        : {
                        code        : 'joinRoom',
                        clientInfo  : encodeURIComponent(JSON.stringify(clientInfo))
                  }
              });
      }
      this.sendToRoom = function (room, data, clientInfo) { 
         me = this;
         me.socket.emit('clientRequest', {
                cmd         : 'sendToRoom',
                room        : room,
                data        : {
                        code        : 'sendData',
                        clientInfo  : encodeURIComponent(JSON.stringify(clientInfo)),
                        data        : encodeURIComponent(JSON.stringify(data))
                }
              });
      }
      this.setClientInfo = function (v) {
          var me = this;
          me.socket.emit('setClientInfo', encodeURIComponent(JSON.stringify(v)));
      }
    
      this.addEvent = function (key, func) {
          var me = this;
          if (key) me.events[key] =  func;  
          if (me.socket) me.setupEvent();
      }
      this.setupEvent = function () {
        var me = this;
        for (var o in me.events) {
             me.socket.off(o);
             me.socket.on(o, (function(o) { return function(data) {
                  if (typeof me.events[o] === 'function') {
                      me.events[o](data.data);
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
    
      this.getRoomClients = function (v) {
          var me = this, session_id = new Date().getTime();
          me.emit('clientRequest', {cmd: 'roomClients', room : v, session_id : session_id});
          var cp = new crowdProcess(), _f = {};
        
          _f['A'] = function(cbk) {
              me.emit('clientRequest', {cmd: 'roomClients', room : v, session_id : session_id});
              cbk(session_id);
          });
         _f['B'] = function(cbk) {
              var _ITV = setInterval(function() {
                  if (typeof _ROOT._sessions[session_id] == 'function') {
                      clearInterval(_ITV);
                      _ROOT._sessions[session_id]();
                  }
              }, 100);
          });       
  
          cp.serial(
          _f,
          function(data) {
          console.log(data);
          }, 6000
          )
          me._sessions[session_id] = function() {
            console.log('---session_id----' + session_id);
          }
      }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
