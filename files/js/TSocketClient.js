(function () { 
    var obj =  function (url) {
        this.getCommServers = function (func) {
            var me = this;
            me.socket.emit('clientRequest', {cmd: 'roomServers'},  func);
        }
        this.connection = function(cbk) {
            var me = this;
            me.socket = io(url);
            /*
            me.socket.on('uniqueId', function(income_data) {
                me.UUID = income_data;
                console.log(me.UUID);
                if (typeof cbk == 'function') { 
                    cbk();
                }  
            });
            */
            me.socket.on('_incomeMessage_', function(income_data) {
                if ((income_data) && (income_data.code) && (me.trigger[income_data.code]) && (typeof me.trigger[income_data.code] === 'function')) {
                    me.trigger[income_data.code](income_data);
                } else {
                    console.log('_incomeMessage_ coming---->>111>>');
                    console.log(income_data)      
                }
            });          
            
            me.socket.on('connect', function() {
                console.log('connected-->');
            });  
            me.socket.on('disconnect', function(reason) {
                console.log(reason);
            }); 

        }
    }   
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = obj;
    } else {
        window.TSocketClient = obj; 
    }
})();
