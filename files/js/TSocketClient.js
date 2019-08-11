(function () { 
    var obj =  function (url) {
        this.connection = function(cbk) {
            var me = this;
            me.socket = io(url);
          //  me.setupEvent();
            me.socket.on('uniqueId', function(income_data) {
                me.UUID = income_data;
                console.log(me.UUID);
                if (typeof cbk == 'function') { 
                    cbk();
                }  
            });
            me.socket.on('_incomeMessage_', function(income_data) {
                if ((income_data) && (income_data.code) && (me.trigger[income_data.code]) && (typeof me.trigger[income_data.code] === 'function')) {
                    me.trigger[income_data.code](income_data);
                } else {
                    console.log('_incomeNotice_ coming---->>111>>');
                    console.log(income_data)      
                }
            });

            me.socket.on('connect', function(income_data) {
                console.log('connected');
            });  
            me.socket.on('disconnect', function(reason) {
                console.log(reason);
            }); 
            /*
            me.socket.on('connect', function(dd){
            });*/
        }
    }   
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = obj;
    } else {
        window.TSocketClient = obj; 
    }
})();
