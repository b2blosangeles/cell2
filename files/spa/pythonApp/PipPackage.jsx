class PipPackage extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {pythonType : 'python'};
    }
    componentDidMount() {
      var me = this;
      me.setState({pythonPackegs: null});
      ReactDOM.TAO.dataEngine({
          type: 'POST',
          url: '/api/python.api',
          data: {code : 'getPackages'},
          dataType: 'JSON',
          timeout: (6 * 1000),
          success: function(resultData){
              me.setState({pythonPackegs: resultData});
              
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
        return(<div className="border border-warning alert-warning rounded m-0 p-2 bodyBox">
            <h5>{this.props.caption}</h5>
            <hr/>
              <div className="container-fluid">
                  <div className="row">
                      {(!this.state.pythonPackegs || !this.state.pythonPackegs.python) ? '' :
                          (<div className="col-sm-6 p-0 pl-2 pr-2">
                          Python packages:
                          <ul>
                              {this.state.pythonPackegs.python.map(function(item, i){
                              return (<li>{item.name} ({item.version})</li>)
                              })}
                          </ul>
                      </div>)}
                      {(!this.state.pythonPackegs || !this.state.pythonPackegs.python3) ? '' :
                          (<div className="col-sm-6 p-0 pl-2 pr-2">
                          Python3 packages:
                          <ul>
                              {this.state.pythonPackegs.python3.map(function(item, i){
                              return (<li>{item.name} ({item.version})</li>)
                              })}
                          </ul>
                      </div>)}
                  </div>
              </div>
              {ReactDOM.TAO.list.Root.showSpinner(me)}
          </div>);
    }
  }