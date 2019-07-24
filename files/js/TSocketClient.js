(function () { 
  var obj =  function () {
      this.socket = null;
      
      this.events = {
          uniqueId : function(data){
            alert('--uniqueId---');
          },
          clientMessage : function(data){
                  console.log('=====clientMessage=====>>>');
                  console.log( decodeURIComponent(data.data.text));
                  console.log('<<<-----clientMessage---');

             }
      }
    
      this.emit = function (k, data) {
        var me = this;
        me.socket.emit(k, data, (data) => {
          alert('after emit');
        }); 
      }
      this.addEvent = function (key, func) {
          var me = this;
          if (key) {
            me.events[key] =  func;
          }    
      }
      this.setupEvent = function () {
        var me = this;
        for (var o in me.events) {
             me.socket.off(o);
             me.socket.on(o, function(data) {
                  if (typeof me.events[o] === 'function') {
                      me.events[o](data);
                  }
             })
        }   
      }
      this.connection = function(url, cbk) {
        var me = this;
        me.socket = io(url);
        me.setupEvent();
        me.socket.on('connect', function(){
          if (typeof cbk == 'function') { 
            cbk();
          }    
        });
      }
                       
      this.getRoomClients = function(cbk) { 
          var me = this;
          me.socket.emit('clientRequest', {cmd: 'roomClients', room : 'NNBB'}, (data) => {}); 
          /*
          var cp = new crowdProcess(), _f = {};
         _f['A'] = function(cbk) {
            cbk(true);
         }      
         cp.serial(
            _f,
           function() {
             alert('TSocketClient2');
           }, 6000
         )
         */
      }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
