class TAORoot extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {};
  }
  componentDidMount() {
	var me = this;  
	ReactDOM.TAO.ajax({
	     type: 'POST',
	     url: '/api/testRestful.api',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  ReactDOM.TAO.setState('*', resultData.data);
	     },
	     error : function(err) { 
	     }
	  });   
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  render() {
    return (
      <span>
        TAORoot 
        <hr/>
	{(this.state._TAOstate) ? this.state._TAOstate.hello : ''}
	<hr/>
      </span>
    );
  }
}
