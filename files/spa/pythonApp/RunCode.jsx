class RunCode extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this;
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
    render() {
        var me = this;
        return(<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4 p-0">
                        <h5>{me.state.caption}</h5>
                    </div>
                    <div className="col-sm-4 p-0">
                    {(me.state.pythonType === 'python') ? (<b>Python</b>) : 
                    (<a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python')}>Python</a>)
                    }</div>
                    <div className="col-sm-4 p-0">
                    {(me.state.pythonType === 'python3') ? (<b>Python3</b>) : 
                    (<a href="javascript:void(0);" onClick={me.switchPythonType.bind(me, 'python3')}>Python3</a>)
                    }</div>
                </div>
            </div>
            <hr/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 p-0 pl-2 pr-2">
                    {(!this.state.pythonCodes) ? '' :
                    (<ul>
                        {this.state.pythonCodes.map(function(item, i){
                        return (<li><a href="javascript:void(0);" onClick={me.runCode.bind(me, item)}>{item}</a></li>)
                        })}
                    </ul>)
                    }
                    </div>
                    <div className="col-sm-10 p-0 m-0">
                        <CodeResult codeFile={me.state.codeFile} pythonType={me.state.pythonType} parent={me} />
                    </div>
                </div>
            </div>
            {ReactDOM.TAO.list.Root.showSpinner(me)}
        </div>
        );
    }
  }