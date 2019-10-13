class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {list : []};
	this.menu = [
		{caption : 'Packages', code : 'getPackages'},
		{caption : 'Add a package', code : 'addPackage'},
		{caption : 'Run pathon code', code : 'runCode'}
	]
  }
  componentDidMount() {
	var me = this;

	ReactDOM.TAO.dataEngine({
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
	     }, 
	     spinner : me	
	});
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  handleClick(item) {
	ReactDOM.TAO.popup({data : item.datname, closeIcon: true});
  }	
  render() {
	var me = this;
	return (
	<div className="border border-success alert-success rounded  m-0 mt-3 mb-2 p-2">
		<h1>Python Integration</h1>
		<p className="p-2">
			{this.menu.map(function(item, i){
				return (<span className="mr-3">
						<a href="javascript:void(0);" onClick={me.handleClick.bind(me, item)}>
						{item.caption}
						</a> 
					</span>)
			})}
		</p>

	</div>
	);
  }
}
