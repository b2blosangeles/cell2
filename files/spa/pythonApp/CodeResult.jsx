class CodeResult extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this;
      // me.loadData(''); 
    }
    componentDidUpdate(prevProps, prevState) {
        var me = this;
        console.log('--lelvel 2-->'); 
        console.log(me.props.parent.state.codeFile); 
        console.log('--lelvel 3-->'); 
        if (me.props.parent.state.codeFile != prevProps.parent.state.codeFile) {
            console.log('--lelvel 6-->'); 
            me.setState({codeFile : me.props.parent.state.codeFile})
        } 
        if (me.state.codeFile !== prevState.codeFile && (me.state.codeFile)) {
			console.log('--load--->' + me.state.codeFile );
		}
      }
    render() {
        var me = this;
        return(
            <div className="m-0 p-0 bodyBox">
              <div className="container-fluid">
                  <div className="row">
                    Test 0
                  </div>
              </div>
          </div>
        )
    }
  }