class HelloMessage extends React.Component {
  constructor(props) {
	super(props);
	this.state = {};
	this.val = 1234;
  }
  render() {
    return (
      <div>
        Hello {this.props.name}
        <hr/>{this.val}<hr/>
        <PelloMessage/>
      </div>
    );
  }
}
class PelloMessage extends React.Component {
  render() {
    return (
      <div>
        PelloMessage
      </div>
    );
  }
}

$(document).ready(function() {
  ReactDOM.render(
    <HelloMessage name="AA" />,
    document.getElementById('bob')
  );
});
