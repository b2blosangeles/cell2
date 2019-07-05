ReactDOM.TAO = new Object();
ReactDOM.TAO.list = {};
ReactDOM.TAO.append = function(obj, pobj) {
    console.log(obj.type.name);
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
ReactDOM.TAO.load = function(obj, pobj) {
    ReactDOM.render(obj, pobj);
}
