class TAOApp extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {val : '111', bb : 'AAA'};
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
	  console.log('---me.Stat-->');
	console.log(me.State);
  }
  render() {
    return (
      <span>
        Hello {this.state.hello} -XX- {this.state.bb} 
        <hr/> {this.state.v} <hr/>
	{(this.state._TAODATA) ? this.state._TAODATA.bb : ''}
      </span>
    );
  }
}
class COMApp extends React.Component {
  constructor(props) {
	super(props);
	ReactDOM.TAO.register(this);
	this.state = {val : '111', bb : 'BBB'};
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
		ReactDOM.TAO.setState(['Tao', 'COM'], {bb : 'CCCCWWW'});
	     },
	     error : function(err) { 
	     }
	  });   
  }
  render() {
    return (
      <span>
        COMMAPP {this.state.hello} -&&- {this.state.bb} 
        <hr/> {this.state.v} <hr/>
	{(this.state._TAODATA) ? this.state._TAODATA.bb : ''}
      </span>
    );
  }
}
$(document).ready(function() {
	ReactDOM.TAO.load('Tao', <TAOApp param={{}} />, document.getElementById('doc'));
	ReactDOM.TAO.append('COM', <COMApp param={{}} />, document.body);
});

