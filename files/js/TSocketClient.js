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

             },
          hubRoomCilents : function(data) {
             console.log('===== hubRoomCilents=====>>>');
                  console.log(data);
                  console.log('<<<----- hubRoomCilents---');
          }
      }
    
      this.emt = function (k, data) {
        var me = this;
        me.socket.emit(k, data, (data) => {
          alert('after emit');
        }); 
      }
      
      this.setUpEvent = function (key, func) {
        var me = this;
        if (key) {
          me.events[key] =  func;
        }
        for (var o in me.events) {
             me.socket.on(o, function() {
                  if (typeof me.events[o] === 'function') {
                      me.events[o](data);
                  }
             })
        }   
      }
      this.connection = function(url, cbk) {
        var me = this;
        me.socket = io(url);
        me.setUpEvent();
        me.socket.on('connect', function(){
          if (typeof cbk == 'function') { 
            cbk();
          }    
        });
      }
                       
      this.getUniqueId = function(cbk) {
        var me = this;
        me.socket.emit('askUniqueId');  
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
              console.log("--sendToRoom------"); // data will be 'woot'
              console.log(data); // data will be 'woot'
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
