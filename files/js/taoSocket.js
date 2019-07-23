(function () { 
  var obj =  function () {

  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
      module.exports = obj;
  } else {
      window.taoSocket = function() {
        return obj; 
      }
  }
})();
