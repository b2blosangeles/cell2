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
    <HelloMessage name="BOB" />,
    document.getElementById('bob')
  );
/*---2---*/
  ReactDOM.render(
    <HelloMessage name="DOC" />,
    document.getElementById('doc')
  );
});
