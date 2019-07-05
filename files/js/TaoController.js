(function() {
    ReactDOM.TAO = {
        list    : {},
        append  : function(id, obj, pobj) {
            obj.props._TAOID = id;
            ReactDOM.render(obj, pobj.appendChild( document.createElement( 'div' )))
        },
        load : function(id, obj, pobj) {
            obj.props._TAOID = id;
            ReactDOM.render(obj, pobj);
        },
        register : function(obj) {
            this.list[obj.props._TAOID] = obj;
        },
        setState : function(id, data) {
            if (id === '*') {
                for (o in this.list) {
                    this.list[id[i]].setState({_TAOUPDATE: new Date().getTime(), _TAODATA: data});
                }
            } else if (Array.isArray(id)) {
                for (var i = 0; i < id.length; i++) {
                     if (typeof this.list[id[i]] === 'object') {
                         this.list[id[i]].setState({_TAOUPDATE: new Date().getTime(), _TAODATA: data});
                     }
                }
            }
        }
    }
})() 
