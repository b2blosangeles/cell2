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

ReactDOM.TAO.register = function(obj) {
    ReactDOM.TAO.list[obj.props._TID] = obj;
}

ReactDOM.TAO.setState = function(id, data) {
    if (id === '*') {
        for (o in ReactDOM.TAO.list) {
            ReactDOM.TAO.list[o].setState(data);
        }
    } else if (Array.isArray(id)) {
        for (var i = 0; i < id.length; i++) {
             if (ReactDOM.TAO.list[id[i]]) {
                 ReactDOM.TAO.list[id[i]].setState(data);
             }
        }
    } else if (ReactDOM.TAO.list[id]) {
         ReactDOM.TAO.list[id].setState(data);
    }
}
