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
      </div>
    );
  }
}

$(document).ready(function() {
  ReactDOM.render(
    <HelloMessage name="" />,
    document.getElementById('bob')
  );
});
