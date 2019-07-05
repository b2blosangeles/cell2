var TAOController = {};
TAOController.list = {};
TAOController.append = function(obj, pobj) {
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
TAOController.load = function(obj, pobj) {
    ReactDOM.render(obj, pobj);
}
