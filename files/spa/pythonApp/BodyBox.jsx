class BodyBox extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {};
  }
  componentDidMount() {
	var me = this;
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
	if (me.state._TAOTM !== prevState._TAOTM) {
		me.setState(me.state._TAOstate);
	} else {
		if (me.state.code !== prevState.code) {
			me.setState({codeFile : null});
		}
	}
  }
  render() {
	var me = this;
	switch (me.state.code) {
		case 'getPackages' :		
			return(<PipPackage caption={me.state.caption} />);
			break;

		case 'getCodes' :
			return(<RunCode caption={me.state.caption} />);
			break;
		default :
			return (<div className="border border-warning alert-warning rounded m-0 p-3 bodyBox">
					<div className="container mt-3">
						{(!this.state.pythonVersion || !this.state.pythonVersion.python) ? '' :
							(<div className="row"><div className="col-sm-2 p-0 pl-2 pr-2"></div>
								<div className="col-sm-10 p-0 pl-2 pr-2">
									<h5>
										<b>Python version:</b>
										&nbsp;{this.state.pythonVersion.python}
									</h5>
								</div>
							</div>)}
						{(!this.state.pythonVersion || !this.state.pythonVersion.python3) ? '' :
							(<div className="row"><div className="col-sm-2 p-0 pl-2 pr-2"></div>
								<div className="col-sm-10 p-0 pl-2 pr-2">
									<h5>
										<b>Python3 version:</b>
										&nbsp;{this.state.pythonVersion.python3}
									</h5>
								</div>
							</div>)}
					</div>
				</div>
			);
			break;
	}
  }
}