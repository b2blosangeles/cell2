(function () { 
    var obj =  function (parent, url) {

        this.init = function(cbk) {
            var me = this;
            me.socket = io(url);

            me.socket.on('connect', function() {
                console.log('connected-2->');
                if (typeof cbk === 'function') { 
                    console.log('cbk---');
                    
                    cbk();
                } 
            });  
            me.socket.on('disconnect', function(reason) {
                console.log('BBBB====>>>>' + reason);
            }); 
           me.socket.on('_incomeMessage_', function(income_data) {
                    console.log('incomeMessage coming--3->');
                    console.log(income_data)      
            });

        }
        this.init(function() {
            console.log(' init --> ' + url);
            console.log(parent._link);
        })
        
        this.joinRoom = function (room, func) { 
            me = this;
            me.socket.emit('clientRequest', {
                cmd         : 'joinRoom',
                data        : {room : room }
            }, func);
        };
    }
    window.TSocketCOMM = obj;
})();
