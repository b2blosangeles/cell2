class TaoContent extends React.Component {
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
      <div className="border border-secondary alert-secondary rounded  m-0 ml-3 p-2">
        <h3>Tao Content</h3>        
	{(this.state._TAOstate) ? this.state._TAOstate.hello : ''}
      </div>
    );
  }
}
