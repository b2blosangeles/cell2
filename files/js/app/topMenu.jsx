class topMenu extends React.Component {
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
		  me.setState(resultData.data);
	     },
	     error : function(err) { 
	     }
	  });   
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
	console.log('---prevStat-->');
	console.log(prevState);
	  console.log('---me.State-=->');
	console.log(me.state);
  }
  render() {
    return (
      <span>
        topMenu {this.state.hello} -XX- {this.state.bb} 
        <hr/> {this.state.v} <hr/>
	{(this.state._TAOstate) ? this.state._TAOstate.bb : ''}
      </span>
    );
  }
}
