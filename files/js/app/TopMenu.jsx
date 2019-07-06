class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {list : []};
  }
  componentDidMount() {
	var me = this;
	ReactDOM.TAO.ajax({
	     type: 'POST',
	     url: '/api/Tao/API_PG.api?code=PGdatabases',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  me.setState({list : resultData.data, _TM : new Date().getTime()});
	     },
	     error : function(err) { 
		     console.log('err');
	     }
	  });   
	  
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  render() {
    return (
      <div className="border border-success alert-success rounded  m-0 mt-3 mb-2 p-2">
        <h1>Tao Development</h1>
	<hr/>
	<p className="wrapper">
		{this.state.list.map(function(item, i){
             		return <a>item.tablename</a>
           	})}
	</p>
      </div>
    );
  }
}
