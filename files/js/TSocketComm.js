(function () { 
    var obj =  function (parent, url) {

        this.init = function(cbk) {
            var me = this;
            me.socket = io(url);

            me.socket.on('connect', function() {
                console.log('connected-->');
                if (typeof cbk === 'function') { 
                    console.log('cbk---');
                    
                    cbk();
                } 
            });  
            me.socket.on('disconnect', function(reason) {
                console.log('BBBB====>>>>' + reason);
            }); 

        }
        this.init(function() {
            console.log(' init --> ' + url);
            console.log(parent._link);
        })
        
        this.joinRoom = function (room, func) { 
            me = this;
            me.emit('clientRequest', {
                cmd         : 'joinRoom',
                room        : room
            }, func);
        };
    }
    window.TSocketCOMM = obj;
})();
