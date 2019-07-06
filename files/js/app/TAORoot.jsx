class TAORoot extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {};
  }
  componentDidMount() {
	var me = this;    
  }
  loadData(cfg) {
	  $.ajax({
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
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  render() {
    return (<span></span>);
  }
}
