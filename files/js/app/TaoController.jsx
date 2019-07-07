(function() {
    ReactDOM.TAO = {
        list    : {},

        load : function(id, obj, pobj) {
		obj.props._TAOID = id;
		if (!this.list.Root && id !== 'Root') {
			this.loadRoot();
		}
		if (pobj) {
			ReactDOM.render(obj.append('ttt'), pobj);
		}
        },
	append  : function(id, obj, pobj) {
	    var newObj = pobj.appendChild( document.createElement( 'div' ));
            this.load(id, obj, newObj);
        },
        register : function(obj) {
            	this.list[obj.props._TAOID] = obj;
        },
        setState : function(id, data) {
            if (id === '*') {
                for (o in this.list) {
                    this.list[o].setState({_TAOTM: new Date().getTime(), _TAOstate: data});
                }
            } else if (Array.isArray(id)) {
                for (var i = 0; i < id.length; i++) {
                     if (typeof this.list[id[i]] === 'object') {
                         this.list[id[i]].setState({_TAOTM: new Date().getTime(), _TAOstate: data});
                     }
                }
            }
        },
	loadRoot : function() {
		this.append('Root', <TAORoot param={{}} />, document.body);
	}
    }
})() 
