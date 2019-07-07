class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {list : []};
  }
  componentDidMount() {
	var me = this;

	ReactDOM.TAO.list.Root.loadData({
	     type: 'POST',
	     url: '/api/Tao/API_PG.api?code=PGdatabases',
	     data: {},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  me.setState({list : resultData.data, _TM : new Date().getTime()});
		  ReactDOM.TAO.list.Root.popup({data : 7789, closeIcon: true});
	     },
	     error : function(err) { 
		     console.log('err');
	     }, 
	     spinner : me	
	});
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  handleClick(item) {
    alert(item.datname);
  }
  render() {
	var me = this;
    return (
      <div className="border border-success alert-success rounded  m-0 mt-3 mb-2 p-2">
	{ReactDOM.TAO.list.Root.showSpinner(me)}
        <h1>Tao Development</h1>
	<p className="p-2">
		{this.state.list.map(function(item, i){
             		return (<span className="mr-3">
					<a href="javascript:void(0);" onClick={me.handleClick.bind(me, item)}>
					{item.datname}
					</a> 
				</span>)
           	})}
	</p>
	
      </div>
    );
  }
}
