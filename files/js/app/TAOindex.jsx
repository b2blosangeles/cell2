$(document).ready(function() {
	ReactDOM.TAO.append('Root', <TAORoot param={{}} />, document.body);
	ReactDOM.TAO.load('topMenu', <TopMenu param={{}} />, document.getElementById('topMenu'));
	ReactDOM.TAO.load('leftMenu', <TopMenu param={{}} />, document.getElementById('leftMenu'));
});

