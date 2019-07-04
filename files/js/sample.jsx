class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
        <hr/>
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
    <HelloMessage name="BOB" />,
    document.getElementById('bob')
  );
/*---8---*/
  ReactDOM.render(
    <HelloMessage name="DOCr" />,
    document.getElementById('doc')
  );
});
