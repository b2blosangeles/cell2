class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {list : []};
  }
  componentDidMount() {
	var me = this; 
  }
  loadData(code) {
	var me = this; 
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
	if (me.state._TAOTM !== prevState._TAOTM) {
		me.setState(me.state._TAOstate);
	} else {
		if (me.state.code !== prevState.code) {
			me.loadData(me.state.code);
		}
	}
  }
  render() {
    var me = this;
    return (
      <div className="border border-warning alert-warning rounded m-0 p-2">
		{me.state.caption}
        <ul>
          {this.state.list.map(function(item, i){
             return (<li>{item.tablename}</li>)
           })}
        </ul>
      </div>
    );
  }
}