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
      <div className="border border-success alert-success rounded  m-1 p-1">
        TopMenu        
	{(this.state._TAOstate) ? this.state._TAOstate.hello : ''}
      </div>
    );
  }
}
