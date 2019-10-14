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
            <div className="m-0 p-2 bodyBox">
            <h5>{me.state.caption}</h5>
            <hr/>
              <div className="container-fluid">
                  <div className="row">
                    Test
                  </div>
              </div>
          </div>
        )
    }
  }