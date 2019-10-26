class RunCode extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {pythonType : 'python', codeList : [], codeListError : false , params : ''};
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
            if (!resultData.error) {
                me.setState({codeList : resultData});
            } else {
                me.setState({codeListError : true});
            }
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
               me.setState({pythonCodeResult: null});
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
    loadData() {
        var me = this;
        me.setState({pythonCodeResult: null});
        ReactDOM.TAO.dataEngine({
            type: 'POST',
            url: '/api/python.api',
            data: {code : 'runCode', codeFile : me.state.codeFile, pythonType : me.state.pythonType, params : me.state.params},
            dataType: 'JSON',
            timeout: (6 * 1000),
            success: function(resultData){
                if (!resultData.error) {
                    me.setState({pythonCodeResult: resultData});
                }
            },
            error : function(err) { 
                console.log('err');
            }, 
            spinner : me
        });
    }
    myChangeHandler(v) {
        var me = this;
        var obj = {}; 
        obj[v] = event.target.value;
    	me.setState(obj);
    }
    run() {
        var me = this;
        if (me.commandLine()) {
            me.loadData();
        }
    }
    commandLine () {
        var me = this;
        return (!me.state.pythonType || !me.state.codeFile) ? '' : '# ' + me.state.pythonType + ' ' +  me.state.codeFile + ' ' + me.state.params
    }
    render() {
        var me = this;
        return (!me.state.codeList.length) ? (<div className="border border-secondary rounded p-3 bodyBox alert-light">
                    <div className="container-fluid">
                        <div className="col-sm-12 text-center">
                            <button type="button" className="btn btn-warning m-2">Load github code</button>
                        </div>     
                    </div>
                git hub parking</div>)
          : (<div className="border border-secondary rounded p-3 bodyBox alert-light">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 ">
                        <button type="button" className="btn btn-danger m-2">Remove code</button>
                        <button type="button" className="btn btn-warning m-2">Load github code</button>
                        <hr/>
                        <h5>{this.props.caption}:</h5>
                        <hr/>
                        <div className="btn-group border border-dark rounded">
                              {(me.state.pythonType === 'python') ? (<button className="btn  disabled rounded-left">
                              <i className="fa fa-check-square-o mr-2" aria-hidden="true"></i>
                              Python</button>)
                            :  (<button className="btn btn-secondary rounded-left" 
                                    onClick={me.switchPythonType.bind(me, 'python')}>
                              Python</button>)}

                            {(me.state.pythonType === 'python3') ? (<button className="btn  disabled rounded-right">
                              <i className="fa fa-check-square-o mr-2" aria-hidden="true"></i>
                              Python3</button>)
                            :  (<button className="btn btn-secondary rounded-right" 
                                    onClick={me.switchPythonType.bind(me, 'python3')}>
                                Python3</button>)}
                        </div>
                        <br/>
                        <div className="container-fluid p-2 rounded">   
                            <div className="row">
                                <div className="col-sm-12 p-0">
                                    {(!this.state.pythonCodes) ? '' :
                                    (<ul>
                                        {this.state.codeList.map(function(item, i){
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
                        <div className="container">
                            <div className="row alert-secondary">
                                <div className="col-sm-1 p-2 pt-3">
                                    Params
                                </div>    
                                <div className="col-sm-11 p-2">
                                    <input type="text" className="form-control" value={me.state.params} onChange={this.myChangeHandler.bind(me, 'params')}/>
                                </div>  
                            </div>
                            <div className="row alert-secondary">
                                <div className="col-sm-1 p-2"></div>    
                                <div className="col-sm-10 p-2">
                                    {me.commandLine()}
                                </div>
                                <div className="col-sm-1 p-2">
                                    {(!me.commandLine()) ? (<button type="button" className="form-control btn btn-secondary disabled">Run</button>) : 
                                    (<button type="button" className="form-control btn btn-danger"  onClick={this.run.bind(me)}>Run</button>)}
                                </div>  
                            </div>
                            <div className="row">
                                <div className="col-sm-12 p-3 border-top border-secondary bg-dark text-success rounded-bottom" style={{'min-height' : '30em'}}>
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
