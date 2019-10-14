class CodeResult extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this;
      console.log('--lelvel 1-->'); 
      onsole.log(me.props.codeFile);
      
      // me.loadData(''); 
    }
    componentDidUpdate(prevProps, prevState) {
        var me = this;
        console.log('--lelvel 2-->'); 
 
        console.log('--lelvel 21-->'); 
        console.log(prevProps.codeFile); 
        console.log('--lelvel 3-->'); 
        console.log(me.props.codeFile); 
        console.log('--lelvel 31-->'); 
        /*
        if (me.state.codeFile !== prevState.codeFile && (me.state.codeFile)) {
			console.log('--load--->' + me.state.codeFile );
		}*/
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