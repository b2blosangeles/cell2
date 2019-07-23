(function () { 
  var obj =  function () {
    this.getRoomClients = function() {
      alert('TSocketClient');
    }
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocketClient = function() {
        return obj; 
      }
  }
})();
