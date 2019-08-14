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
                if ((income_data) && (income_data.code) && (me.trigger[income_data.code]) && (typeof me.trigger[income_data.code] === 'function')) {
                    me.trigger[income_data.code](income_data);
                } else {
                      console.log('_incomeNotice_ coming---->>777>>' + me.socket.id);
                      console.log(income_data)      
                }     
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
                Uroom : url + '->' + room,
                data        : {room : room }
            }, func);
        };
    }
    window.TSocketCOMM = obj;
})();
