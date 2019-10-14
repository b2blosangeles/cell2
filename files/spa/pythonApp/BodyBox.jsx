class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {
		pythonPackegs : { 
			python : [], 
			python3 : []
		}
	};
  }
  componentDidMount() {
	var me = this; 
  }
  loadData(code) {
	var me = this;
	switch (code) {
		case 'getPackages' :
			ReactDOM.TAO.dataEngine({
				type: 'POST',
				url: '/api/python.api?code=getPackages',
				data: {},
				dataType: 'JSON',
				timeout: (6 * 1000),
				success: function(resultData){
					console.log(resultData);
					me.setState({pythonPackegs: resultData, _TM : new Date().getTime()});
					
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
				<div className="border border-warning alert-warning rounded m-0 p-2">
				  <b>{me.state.caption}</b>
				  <hr/>
					<div className="container-fluid bg-light">
						<div className="row">
							<div className="col-sm-6 p-0 pl-2 pr-2">
								Python packages:
								<ul>
									{this.state.pythonPackegs.python.map(function(item, i){
									return (<li>{item.name} ({item.version})</li>)
									})}
								</ul>
							</div>
							<div className="col-sm-6 p-0 pl-2 pr-2">
								Python3 packages:
								<ul>
									{this.state.pythonPackegs.python3.map(function(item, i){
									return (<li>{item.name} ({item.version})</li>)
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			  );
			break;
		default :
			return (<div className="border border-warning alert-warning rounded m-0 p-2">
				{me.state.caption}
				</div>
			);
			break;
	}
  }
}