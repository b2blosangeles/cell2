ReactDOM.TAOController = new Object();
ReactDOM.TAOController.append = function(obj, pobj) {
    ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )));
}
