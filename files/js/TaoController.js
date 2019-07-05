ReactDOM.TAO = new Object();
ReactDOM.TAO.list = {};
ReactDOM.TAO.append = function(id, obj, pobj) {
    obj.props._TID = id;
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
ReactDOM.TAO.load = function(id, obj, pobj) {
    obj.props._TID = id;
    ReactDOM.render(obj, pobj);
}
ReactDOM.TAO.setState = function(id, data) {
    ReactDOM.TAO.list[id].setState(data);
}
