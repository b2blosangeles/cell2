class RunCode extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {pythonType : 'python', pythonCodeResult : {}};
    }
    componentDidMount() {
      var me = this;
      me.setState({pythonVersion: null});
      ReactDOM.TAO.dataEngine({
        type: 'POST',
        url: '/api/python.api',
        data: {code : 'getCodes'},
        dataType: 'JSON',
        timeout: (6 * 1000),
        success: function(resultData){
            me.setState({pythonCodes: resultData});
            
        },
        error : function(err) { 
            console.log('err');
        }, 
        spinner : me
      });
    }
    componentDidUpdate(prevProps, prevState) {
        var me = this;
        if ((me.state.codeFile !== prevState.codeFile || me.state.pythonType !== prevState.pythonType) && (me.state.codeFile)) {
            me.loadData(me.state.codeFile);
        }
    }
    switchPythonType(type) {
        var me = this;
        me.setState({pythonType : type});
    }
    runCode (codefn) {
        var me = this;
        // me.setState({codeFile : null}, function() {
        //	console.log('--00700--');
            me.setState({codeFile : codefn});
        //});
    
    }
    loadData(code) {
        var me = this;
        me.setState({pythonCodeResult: null});
        ReactDOM.TAO.dataEngine({
            type: 'POST',
            url: '/api/python.api',
            data: {code : 'runCode', codeFile : code, pythonType : me.state.pythonType},
            dataType: 'JSON',
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
    render() {
        var me = this;
        return(<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 p-2 border border-secondary rounded">
                        <h5>{this.props.caption}</h5>
                        <br/>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6 p-0">
                                {(me.state.pythonType === 'python') ? (<b>Python</b>) : 
                                (<a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python')}>Python</a>)
                                }</div>
                                <div className="col-sm-6 p-0">
                                {(me.state.pythonType === 'python3') ? (<b>Python3</b>) : 
                                (<a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python3')}>Python3</a>)
                                }</div>
                            </div>
                        </div>
                         <hr/>
                    {(!this.state.pythonCodes) ? '' :
                    (<ul>
                        {this.state.pythonCodes.map(function(item, i){
                            return (me.state.codeFile === item) ? (<li><b>{item}</b></li>) :
                            (<li><a href="javascript:void(0);" onClick={me.runCode.bind(me, item)}>{item}</a></li>)
                        })}
                    </ul>)
                    }
                    </div>
                    <div className="col-sm-8 p-0 m-0">
                    
                        <div className="m-0 p-0 bodyBox">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-12 p-2">
                                            {/*me.state.codeFile */}
                                            <b>Type : <b/></b>&nbsp;&nbsp;
                                            {(!me.state.pythonCodeResult) ? '' : me.state.pythonCodeResult.pythonType}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 p-2">
                                            <b>Result : </b><br/>
                                            {(!me.state.pythonCodeResult) ? '' : JSON.stringify(me.state.pythonCodeResult.data)}
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            {ReactDOM.TAO.list.Root.showSpinner(me)}
        </div>
        );
    }
  }
