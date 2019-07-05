class TAOApp extends React.Component {
  constructor(props) {
	super(props);
	this.state = {val : '111'};
  }
  componentDidMount() {
	var me = this;
	$.ajax({
	     type: 'POST',
	     url: '/api/testRestful.api',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  me.setState(resultData.data);
	     },
	     error : function(xhr, textStatus, error) { 
	     }
	  });   
  }
  render() {
    return (
      <span>
        Hello {this.state.hello}
        <hr/> {this.state.v} <hr/>
      </span>
    );
  }
}
class COMApp extends React.Component {
  constructor(props) {
	super(props);
	this.state = {val : '111'};
  }
  componentDidMount() {
	var me = this;
	$.ajax({
	     type: 'POST',
	     url: '/api/testRestful.api',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  me.setState(resultData.data);
	     },
	     error : function(xhr, textStatus, error) { 
	     }
	  });   
  }
  render() {
    return (
      <span>
        COMMAPP {this.state.hello}
        <hr/> {this.state.v} <hr/>
      </span>
    );
  }
}
$(document).ready(function() {
	ReactDOM.render(
		<TAOApp param={{}} />,
		document.body.appendChild( document.createElement( 'div' ) )
		// document.getElementById('bob')
	);
	
	ReactDOM.render(
		<COMApp param={{}} />,
		document.body.appendChild( document.createElement( 'div' ) )
		// document.getElementById('bob')
	);
});

