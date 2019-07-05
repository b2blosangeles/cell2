class TopMenu extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	ReactDOM.TAO.register(this);
	this.state = {};
  }
  componentDidMount() {
	var me = this;
  }
  componentDidUpdate(prevProps, prevState) {
	var me = this;
  }
  render() {
    return (
      <span>
        TopMenu 
	{(this.state._TAOstate) ? this.state._TAOstate.hello : ''}
      </span>
    );
  }
}
