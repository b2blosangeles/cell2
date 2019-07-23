(function () { 
  var obj =  function () {
    
      this.socket = null;

      this.connection = function(url, cbk) {
        var me = this;
        me.socket = io(url);
        me.socket.on('connect', function(){
          if (typeof cbk == 'function') { 
            cbk();
          }    
        });
      }
                       
      this.getUniqueId = function(cbk) {
        this.socket.emit('askUniqueId'); 
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
