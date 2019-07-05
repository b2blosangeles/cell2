ReactDOM.TAO = new Object();
ReactDOM.TAO.list = {};
ReactDOM.TAO.append = function(obj, pobj) {
    console.log(obj);
    ReactDOM.TAO.list[obj.type.name] = obj;
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
ReactDOM.TAO.load = function(obj, pobj) {
    ReactDOM.TAO.list[obj.type.name] = obj;
    ReactDOM.render(obj, pobj);
}
