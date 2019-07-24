(function () { 
  var obj =  function () {
    
      this.socket = null;
      
      this.events = {
        uniqueId : function(data){
          alert('--uniqueId---');
        }
      }
      this.trigger = {
        askUniqueId : function(socket) {
            this.socket.emit('askUniqueId'); 
        }
      }
      this.setUpEvent = function () {
        var me = this;
        for (var o in me.events) {
             me.socket.on(o, function() {
                  if (typeof me.events[o] === 'function') {
                    typeof me.events[o](data);
                  }
             })
        }   
      }
      this.connection = function(url, cbk) {
        var me = this;
        me.socket = io(url);
        me.socket.on('connect', function(){
          if (typeof cbk == 'function') { 
            alert(123);
            cbk();
          }    
        });
      }
                       
      this.getUniqueId = function(cbk) {
        var me = this;
        me.trigger.askUniqueId(me.socket);
        this.socket.on('uniqueId', function(data){
             if (typeof cbk == 'function') { 
               cbk(data);
             }
        });  
       }
      this.sendToRoom = function(cbk) { 
          var me = this;
          me.socket.emit('clientRequest', {
                cmd : 'sendToRoom',
                room : 'NNBB',
                data : {
                  client_id : 1,
                  user_name : 'John Xu',
                  text : encodeURIComponent('how are you')
                }
              }, (data) => {
                console.log(data); // data will be 'woot'
              });
      }
      this.sendToRoom = function(cbk) { 
          var me = this;
          me.socket.emit('clientRequest', {
                cmd : 'sendToRoom',
                room : 'NNBB',
                data : {
                  client_id : 1,
                  user_name : 'John Xu',
                  text : encodeURIComponent('how are you')
                }
              }, (data) => {
                console.log(data); // data will be 'woot'
              });
        
           me.socket.on('clientMessage', function(data){
                console.log('=====clientMessage=====>>>');
                console.log( decodeURIComponent(data.data.text));
                console.log('<<<-----clientMessage---');

           });
      }
    
      this.getRoomClients = function(cbk) { 
          var me = this;
          me.socket.emit('clientRequest', {cmd: 'roomClients', room : 'NNBB'}, (data) => {}); 
          me.socket.on('hubRoomCilents', function(data){
             if (typeof cbk == 'function') { 
               cbk(data);
             }           
          })
   
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
