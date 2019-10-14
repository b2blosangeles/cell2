class CodeResult extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = {};
    }
    componentDidMount() {
      var me = this;
      // me.loadData(''); 
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