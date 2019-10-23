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
        alert(me.state.pythonType + '---' + type);
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
        return(<div className="border border-warning rounded m-0 p-2 bodyBox alert-secondary">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 ">
                        <h5>{this.props.caption}:</h5>
                        <div className="container-fluid p-2 rounded">
                            <div className="row">
                                <div className="col-sm-12 p-0">
                                    {(!this.state.pythonCodes) ? '' :
                                    (<ul>
                                        {this.state.pythonCodes.map(function(item, i){
                                            return (me.state.codeFile === item) ? (<li><b>{item}</b></li>) :
                                            (<li><a href="javascript:void(0);" onClick={me.runCode.bind(me, item)}>{item}</a></li>)
                                        })}
                                    </ul>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9 p-0 border border-warning rounded">
                        <div className="container ">
                            <div className="row">
                                <div className="col-sm-12 p-2 alert-info text-right">
                                    <div className="btn-group border border-secondary rounded">
                                      <button className={(me.state.pythonType === 'python') ? 'btn disabled' : 'btn btn-secondary'}
                                           onClick={me.switchPythonType.bind(me, 'python')}>Python</button>
                                      <button className={(me.state.pythonType === 'python3') ? 'btn  disabled' : 'btn btn-secondary'}
                                           onClick={me.switchPythonType.bind(me, 'python3')}>Python3</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-12 p-3 border-top border-warning " style={{'min-height' : '28em'}}>
                                    {(!me.state.pythonCodeResult) ? '' : JSON.stringify(me.state.pythonCodeResult.data)}
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
