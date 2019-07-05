ReactDOM.TAO = new Object();
ReactDOM.TAO.list = {};
ReactDOM.TAO.append = function(id, obj, pobj) {
    console.log(obj);
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
ReactDOM.TAO.load = function(id, obj, pobj) {
    ReactDOM.render(obj, pobj);
}
