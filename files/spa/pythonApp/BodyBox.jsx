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
			return(<PythonVersion />);
			break;
	}
  }
}
