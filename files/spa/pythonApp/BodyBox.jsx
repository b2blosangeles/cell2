class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {};
  }
  componentDidMount() {
	var me = this; 
  }
  loadData(code) {
	var me = this;
	switch (code) {
		case 'getPackages' :
			me.setState({pythonPackegs: null});
			ReactDOM.TAO.dataEngine({
				type: 'POST',
				url: '/api/python.api?code=getPackages',
				data: {},
				dataType: 'JSON',
				timeout: (6 * 1000),
				success: function(resultData){
					console.log(resultData);
					me.setState({pythonPackegs: resultData});
					
				},
				error : function(err) { 
					console.log('err');
				}, 
				spinner : me
			});
			break;
		default :
	}
  
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
	switch (me.state.code) {
		case 'getPackages' :
			return (
				<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
				  <h3>{me.state.caption}</h3>
				  <hr/>
					<div className="container-fluid">
						<div className="row">
							{(!this.state.pythonPackegs || !this.state.pythonPackegs.python) ? '' :
								(<div className="col-sm-6 p-0 pl-2 pr-2">
								Python packages:
								<ul>
									{this.state.pythonPackegs.python.map(function(item, i){
									return (<li>{item.name} ({item.version})</li>)
									})}
								</ul>
							</div>)}
							{(!this.state.pythonPackegs || !this.state.pythonPackegs.python3) ? '' :
								(<div className="col-sm-6 p-0 pl-2 pr-2">
								Python3 packages:
								<ul>
									{this.state.pythonPackegs.python3.map(function(item, i){
									return (<li>{item.name} ({item.version})</li>)
									})}
								</ul>
							</div>)}
						</div>
					</div>
				</div>
			  );
			break;
		default :
			return (<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
				<h3>{me.state.caption}</h3>
				</div>
			);
			break;
	}
  }
}