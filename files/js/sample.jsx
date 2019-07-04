class HelloMessage extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
	

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
		  var val = resultData.data.val;
		  me.setState(resultData.data);

			

	     },
	     error : function(xhr, textStatus, error) { 
	     }
	  });   
  }
  render() {
    return (
      <div>
        Hello {this.state.hello}
        <hr/> {this.state.v} <hr/>
      </div>
    );
  }
}
$(document).ready(function() {
	ReactDOM.render(
		<HelloMessage name={} />,
		document.getElementById('bob')
	);
});

