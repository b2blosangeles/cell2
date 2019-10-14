class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {};
  }
  componentDidMount() {
	var me = this;
	me.loadData(''); 
  }
  loadData(code) {
	var me = this;
	switch (code) {
		case 'getPackages' :
			me.setState({pythonPackegs: null});
			ReactDOM.TAO.dataEngine({
				type: 'POST',
				url: '/api/python.api',
				data: {code : 'getPackages'},
				dataType: 'JSON',
				timeout: (6 * 1000),
				success: function(resultData){
					me.setState({pythonPackegs: resultData});
					
				},
				error : function(err) { 
					console.log('err');
				}, 
				spinner : me
			});
			break;

		case 'runCode' :
			me.setState({pythonPackegs: null});
			ReactDOM.TAO.dataEngine({
				type: 'POST',
				url: '/api/python.api',
				data: {code : 'getCodes'},
				dataType: 'JSON',
				timeout: (6 * 1000),
				success: function(resultData){
					me.setState({pythonCodes: resultData});
					
				},
				error : function(err) { 
					console.log('err');
				}, 
				spinner : me
			});
			break;
		default :
			me.setState({pythonVersion: null});
			ReactDOM.TAO.dataEngine({
				type: 'POST',
				url: '/api/python.api',
				data: {code : 'getPythonVersion'},
				dataType: 'JSON',
				timeout: (6 * 1000),
				success: function(resultData){
					me.setState({pythonVersion: resultData});
					
				},
				error : function(err) { 
					console.log('err');
				}, 
				spinner : me
			});
			break;
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
				  <h5>{me.state.caption}</h5>
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

		case 'runCode' :
					return (
						<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
						  <h5>{me.state.caption}</h5>
						  <hr/>
							<div className="container-fluid">
								<div className="row">
									{(!this.state.pythonCodes) ? '' :
										(<div className="col-sm-6 p-0 pl-2 pr-2">
										Python codes:
										<ul>
											{this.state.pythonCodes.map(function(item, i){
											return (<li>{item}</li>)
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
					<div className="container mt-3">
						<div className="row">
							
							{(!this.state.pythonVersion) ? '' :
								(<div className="col-sm-2 p-0 pl-2 pr-2"></div><div className="col-sm-10 p-0 pl-2 pr-2">
								<h5><b>Python version:</b>
								{this.state.pythonVersion.python}
								</h5>
							</div>)}
						</div>
					</div>
					<div className="container">
						<div className="row">
							{(!this.state.pythonVersion) ? '' :
								(<div className="col-sm-2 p-0 pl-2 pr-2"></div><div className="col-sm-10 p-0 pl-2 pr-2">
								<h5>
								<b>Python3 version:</b>
								{this.state.pythonVersion.python3}
								</h5>
							</div>)}
						</div>
					</div>
				</div>
			);
			break;
	}
  }
}