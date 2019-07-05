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
        },
        ajax : function(cfg) {
          $ajax({
             type: (cfg.type) ? cfg.type : 'POST',
             url: cfg.url,
             data: (cfg.data) ? cfg.data : {},
             dataType: (cfg.dataType) ? cfg.dataType : 'JSON',
             timeout: (cfg.timeout) ? cfg.timeout : 6000,
             success: function(resultData){
                if  (typeof cfg.success == 'function') {
                    cfg.success(resultData)
                }
             },
	     error : function(xhr, textStatus, error) { 
                if  (typeof cfg.error == 'function') {
                    cfg.error(error)
                }
	     }
	   });
        }
    }
})() 
