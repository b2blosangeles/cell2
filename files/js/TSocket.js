(function () { 
  var obj =  function () {

  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.TSocket = function() {
        return obj; 
      }
  }
})();
