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
        if (me.state.pythonType !== type) {
                me.setState({pythonType : type});
        }
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
        return(<div className="border border-secondary rounded p-3 bodyBox alert-secondary">
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
                    <div className="col-sm-9 p-0 border border-secondary rounded shadow-sm">
                        <div className="container ">
                            <div className="row">
                                <div className="col-sm-12 p-2 bg-light text-right rounded">
                                    <div className="btn-group border border-secondary rounded">
                                          {(me.state.pythonType === 'python') ? (<button className="btn  disabled rounded">
                                          <i className="fa fa-check-square-o mr-2" aria-hidden="true"></i>
                                          Python</button>)
                                        :  (<button className="btn btn-secondary rounded" 
                                                onClick={me.switchPythonType.bind(me, 'python')}>
                                          Python</button>)}
                                        
                                        {(me.state.pythonType === 'python3') ? (<button className="btn  disabled rounded">
                                          <i className="fa fa-check-square-o mr-2" aria-hidden="true"></i>
                                          Python3</button>)
                                        :  (<button className="btn btn-secondary rounded" 
                                                onClick={me.switchPythonType.bind(me, 'python3')}>
                                            Python3</button>)}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-12 p-3 border-top border-dark bg-dark text-success rounded-bottom" style={{'min-height' : '36em'}}>
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
