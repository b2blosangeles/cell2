class CodeResult extends React.Component {
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
        if (me.props.codeFile !== prevProps.codeFile) {
			console.log('--load--->' + me.props.codeFile  );
		}
      }
    render() {
        var me = this;
        return(
            <div className="m-0 p-0 bodyBox">
              <div className="container-fluid">
                  <div className="row">
                    =={me.props.codeFile }==
                  </div>
              </div>
          </div>
        )
    }
  }