class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}
$(document).ready(function() {
  ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById('doc')
  );
  ReactDOM.render(
    <HelloMessage name="BOB" />,
    document.getElementById('bob')
  );
});
