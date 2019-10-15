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
            data: {code : 'runCode', codeFile : code, pythonType : me.state.pythonType},
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
    switchPythonType(type) {
        var me = this;
        me.setState({pythonType : type});
    }
    componentDidUpdate(prevProps, prevState) {
        var me = this;
        if (me.props.codeFile !== prevProps.codeFile && (me.props.codeFile) ) {
            me.setState({codeFile : me.props.codeFile});
			return true;
        }
        if ((me.state.codeFile !== prevState.codeFile || me.state.pythonType !== prevState.pythonType) && (me.state.codeFile)) {
            console.log('---load 23--->' + me.props.codeFile);
            me.loadData(me.props.codeFile);
        }
      }
    render() {
        var me = this;
        return(<div className="m-0 p-0 bodyBox">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4 p-0">
                                {me.props.codeFile }
                            </div>
                            <div className="col-sm-4 p-0">
                            <a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python')}>Python</a>
                            </div>
                            <div className="col-sm-4 p-0">
                            <a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python3')}>Python3</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 p-0 pl-2 pr-2">
                                {me.state.pythonCodeResult}
                            </div>
                        </div>
                    </div>
                    {ReactDOM.TAO.list.Root.showSpinner(me)}
              </div>)
    }
  }