class HelloMessage extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
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
		  ReactDOM.render(
		    <HelloMessage name={} />,
		    document.getElementById('bob')
		  );
			

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
	$.ajax({
	     type: 'POST',
	     url: '/api/testRestful.api',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  var val = resultData.data.val;
		  ReactDOM.render(
		    <HelloMessage name={resultData.data} />,
		    document.getElementById('bob')
		  );
			

	     },
	     error : function(xhr, textStatus, error) { 
	     }
	  }); 

});

