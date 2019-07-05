ReactDOM.TAO = new Object();
ReactDOM.TAO.list = {};
ReactDOM.TAO.append = function(obj, pobj) {
    alert(obj.name);
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
ReactDOM.TAO.load = function(obj, pobj) {
    ReactDOM.render(obj, pobj);
}
