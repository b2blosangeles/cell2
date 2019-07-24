(function () { 
  var obj =  function () {
      this.socket = null;
      
      this.events = {}
    
      this.emit = function (k, data) {
        var me = this;
        me.socket.emit(k, data); 
      }
    
      this.emitFlow = function (k, data) { // TODO
        var me = this, d = data;
        d._ID = new Date.getTime();
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
        
        me.socket.emit(k, data); 
      }
      this.addEvent = function (key, func) {
          var me = this;
          if (key) me.events[key] =  func;  
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
      this.disConnect = function() {
        var me = this;
        me.socket.disconnect();
      }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
