(function () { 
    var obj =  function (parent, url, svr) {
        
        this.getSN = function() {
            var me = this; me._SN = (!me._SN || me._SN > 999999) ? 1 : (me._SN + 1)
            return 'A_' + me._SN;
        }        
        
        this.emit = function (k, data, cbk) {
            var me = this; me._Rsessions = (!me._Rsessions)? {} : me._Rsessions = {};
            var session_id = me.getSN();
            data.session_id  = session_id;
            me.socket.emit(k, data); 
            me.sessionCallback(session_id, cbk);
        };  
        
        this.sessionCallback = function(session_id, func) {
              me = this;
              var _ITV = setInterval(
                    (function(me) { return function() {
                            if (typeof me._Rsessions[session_id] === 'function') {
                                clearInterval(_ITV);
                                me._Rsessions[session_id](func);
                                delete me._Rsessions[session_id];
                            }
                    } })(me), 100);
            
              setTimeout( (function(me) { return function() {
                        clearInterval(_ITV);
                        delete me._Rsessions[session_id];
                  } })(me), 6000);      
        }
        
        this.init = function(cbk) {
            var me = this;
            me.socket = io(url);

            me.socket.on('connect', function() {
                console.log('---me.socket.adapter.rooms--->');
                console.log(me.socket.adapter.rooms);
                if (typeof cbk === 'function') { 
                    cbk();
                } 
            });  
            me.socket.on('disconnect', function(reason) {
                console.log('BBBB====>>>>' + reason);
            }); 
           me.socket.on('_incomeMessage_', function(income_data) {
                if ((income_data) && (income_data.code) && (me.trigger[income_data.code]) && (typeof me.trigger[income_data.code] === 'function')) {
                    me.trigger[income_data.code](income_data);
                } else {
                      console.log('_incomeNotice_ coming---->>777>>' + me.socket.id);
                      console.log(income_data)      
                }     
            });
            me.socket.on('_callbackMessage_',function(data) {
               if (!data || !data.session_id) return true;
               var s = data.session_id.split('.');

                  me._Rsessions[s[1]] = function(cbk) {
                       delete me._Rsessions[s[1]];
                       delete data.session_id;
                       if (typeof cbk === 'function') cbk(data);
                   }
            });
        }
        this.init(function() {
            console.log(' init --> ' + url);
        })
        
        this.createRoom = function (room, func) { 
            me = this;
            me.emit('clientRequest', {
                cmd     : 'createRoom',
                room    : room,
                data    : {}
            }, func);
        };
    }
    window.TSocketCOMM = obj;
})();
