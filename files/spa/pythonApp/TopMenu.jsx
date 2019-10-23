class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {};
	this.menu = [
		{caption : 'Run a python code', code : 'getCodes'},
		{caption : 'Pip packages', code : 'getPackages'}
	]
  }
  componentDidMount() {
	var me = this;
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  handleClick(item) {
	// ReactDOM.TAO.popup({data : item.datname, closeIcon: true});
	var me = this;
	me.setState({menuIten : item.code}, function() {
		ReactDOM.TAO.setState('BodyBox', item);
	})
  }	
  render() {
	var me = this;
	return (
	<div className="border border-warning alert-warning rounded  m-0 mt-2 mb-2 p-2">
		<h1>Python Integration Kit (&Alpha; 1.0)</h1>
		<p className="p-2">
			{this.menu.map(function(item, i){

				return (me.state.menuIten !== item.code) ? (<span className="mr-3">
						<a href="javascript:void(0);"  className="btn btn-success" onClick={me.handleClick.bind(me, item)}>
						{item.caption}
						</a> 
					</span>) : (<span className="mr-3">
						<a className="btn btn-success border border-danger text-light">{item.caption}</a> 
					</span>)
			})}
		</p>

	</div>
	);
  }
}
