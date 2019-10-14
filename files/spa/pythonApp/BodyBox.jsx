class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {list : []};
  }
  componentDidMount() {
	var me = this; 
	// alert(me.props.param.code)
	
	ReactDOM.TAO.dataEngine({
	     type: 'POST',
	     url: '/api/Tao/API_PG.api?code=PGtables',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  me.setState({list : resultData.data, _TM : new Date().getTime()});
	     },
	     error : function(err) { 
		     console.log('err');
	     }, 
	     spinner : me
	  });   
	
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
	console.log('---uploaded-AAA-->');
	if (me.state._TAOTM !== prevState._TAOTM) {
		console.log(me.state._TAOstate);
	}
  }
  render() {
    var me = this;
    return (
      <div className="border border-warning alert-warning rounded m-0 p-2">
	ALL TABLES : {me.props.param.code}
        <ul>
          {this.state.list.map(function(item, i){
             return (<li>{item.tablename}</li>)
           })}
        </ul>
      </div>
    );
  }
}
