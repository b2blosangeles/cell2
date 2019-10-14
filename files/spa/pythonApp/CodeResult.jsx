class CodeResult extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this; 
    }
    loadData(code) {
        var me = this;
        me.setState({pythonCodeResult: null});
        ReactDOM.TAO.dataEngine({
            type: 'POST',
            url: '/api/python.api',
            data: {code : 'runCode', codeFile : code},
            dataType: 'TEXT',
            timeout: (6 * 1000),
            success: function(resultData){
                me.setState({pythonCodeResult: resultData});
            },
            error : function(err) { 
                console.log('err');
            }, 
            spinner : me
        });
    }
    componentDidUpdate(prevProps, prevState) {
        var me = this;
        if (me.props.codeFile !== prevProps.codeFile) {
			me.loadData(me.props.codeFile );
		}
      }
    render() {
        var me = this;
        return(
            <div className="m-0 p-0 bodyBox">
              <div className="container-fluid">
                  <div className="row">
                    =={me.props.codeFile }==
                    {me.state.pythonCodeResult}
                  </div>
              </div>
          </div>
        )
    }
  }