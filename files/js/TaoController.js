(function() {
    ReactDOM.TAO = {
        list    : {},
        append  : function(id, obj, pobj) {
            obj.props._TID = id;
            ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )))
        },
        load : function(id, obj, pobj) {
            obj.props._TID = id;
            ReactDOM.render(obj, pobj);
        },
        register : function(obj) {
            ReactDOM.TAO.list[obj.props._TID] = obj;
        },
        setState : function(id, data) {
            if (id === '*') {
                for (o in ReactDOM.TAO.list) {
                    ReactDOM.TAO.list[o].setState({_TTM: new Date().getTime(), _TDATA: data});
                }
            } else if (Array.isArray(id)) {
                for (var i = 0; i < id.length; i++) {
                     if (ReactDOM.TAO.list[id[i]]) {
                         ReactDOM.TAO.list[id[i]].setState({_TTM: new Date().getTime(), _TDATA: data});
                     }
                }
            } else if (ReactDOM.TAO.list[id]) {
                 ReactDOM.TAO.list[id].setState({_TTM: new Date().getTime(), _TDATA: data});
            }
        }
    }
})() 
