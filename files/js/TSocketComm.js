(function () { 
    var obj =  function (room, url) {

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
                console.log(reason);
            }); 

        }
        this.init(function() {
            console.log(room + ' init --> ' + url);
        })
    }
    window.TSocketCOMM = obj;
})();
