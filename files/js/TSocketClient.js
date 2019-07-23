(function () { 
  var obj =  function () {
    
    this.socket = null;
    
    this.connection = function(url) {
      this.socket = io(url);
    }
    this.getRoomClients = function() {
    //  alert('TSocketClient');
    }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = obj; 
  }
})();
