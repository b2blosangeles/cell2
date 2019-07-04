class HelloMessage extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
	var me = this;

  }
  render() {
    return (
      <div>
        Hello {this.props.name.val}
        <hr/> CCC <hr/>
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

