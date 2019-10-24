class PythonVersion extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this;
      me.setState({pythonVersion: null});
      ReactDOM.TAO.dataEngine({
          type: 'POST',
          url: '/api/python.api',
          data: {code : 'getPythonVersion'},
          dataType: 'JSON',
          timeout: (6 * 1000),
          success: function(resultData){
              me.setState({pythonVersion: resultData});
              
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
    render() {
        var me = this;
        return (<div className="border border-secondary bg-light rounded p-5 bodyBox">
                <h5>Server Python Version</h5>
                <hr/>
                <div className="container">
                    {(!this.state.pythonVersion || !this.state.pythonVersion.python) ? '' :
                        (<div className="row"><div className="col-sm-2"></div>
                            <div className="col-sm-10 p-4">
                                <h5>
                                    <b>Python:</b>
                                    &nbsp;{this.state.pythonVersion.python}
                                </h5>
                            </div>
                        </div>)}
                    {(!this.state.pythonVersion || !this.state.pythonVersion.python3) ? '' :
                        (<div className="row"><div className="col-sm-2"></div>
                            <div className="col-sm-10 p-4">
                                <h5>
                                    <b>Python3:</b>
                                    &nbsp;{this.state.pythonVersion.python3}
                                </h5>
                            </div>
                        </div>)}
                </div>
                {ReactDOM.TAO.list.Root.showSpinner(me)}
            </div>);
    }
  }
