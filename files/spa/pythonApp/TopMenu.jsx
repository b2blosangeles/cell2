class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {};
	this.menu = [
		{caption : 'Run a python code', code : 'getCodes'},
		{caption : 'Pip packages', code : 'getPackages'},
		{caption : 'Add a package', code : 'addPackage'}
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
	ReactDOM.TAO.setState('BodyBox', item);
  }	
  render() {
	var me = this;
	return (
	<div className="border border-success alert-success rounded  m-0 mt-2 mb-2 p-2">
		<h1>Python Integration Tool (v1.0)</h1>
		<p className="p-2">
			{this.menu.map(function(item, i){
				return (<span className="mr-3">
						<a href="javascript:void(0);"  className="border border-secondary rounded p-2" onClick={me.handleClick.bind(me, item)}>
						{item.caption}
						</a> 
					</span>)
			})}
		</p>

	</div>
	);
  }
}
