(function () { 
  var obj =  function () {
      this.socket = null;
      this.events = {}
    
      this.emit = function (k, data) {
        var me = this;
        me.socket.emit(k, data); 
      }

      this.query = function (k, data) { 
         me = this, d = data;
         var cp = new crowdProcess(), _f = {};
         _f['A'] = function(cbk) {
            me.socket.on('uniqueId', function(income_data) {
                  cbk(income_data);
            })
            me.socket.emit('askUniqueId');
         }    
         cp.serial(
            _f,
           function(data) {
             console.log(data);
           }, 6000
         )
        
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
         me.socket.on('uniqueId', function(income_data) {
              me.UUID = income_data;
           console.log(me.UUID);
              if (typeof cbk == 'function') { 
            //    cbk();
              }  
        })
        me.socket.on('connect', function(dd){
        });
      }
      this.disConnect = function() {
        var me = this;
      //  me.socket.close();
       // me.socket.emit('disconnect');
      }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
