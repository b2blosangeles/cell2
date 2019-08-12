(function () { 
    var obj =  function () {

        this.connection = function(cbk) {
            var me = this;
            me.socket = io(url);

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
                if (typeof cbk === 'function') { 
                    console.log('cbk---');
                    
                    cbk();
                } 
            });  
            me.socket.on('disconnect', function(reason) {
                console.log(reason);
            }); 

        }
    }   
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = obj;
    } else {
        window.TSocketCOMM = obj; 
    }
})();
