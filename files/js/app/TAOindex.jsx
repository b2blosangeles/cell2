$(document).ready(function() {
	// ReactDOM.TAO.append('Root', <TAORoot param={{}} />, document.body);
	ReactDOM.TAO.loadRoot();
	ReactDOM.TAO.load('topMenu', <TopMenu param={{}} />, document.getElementById('topMenu'));
	ReactDOM.TAO.load('leftBox', <LeftBox param={{}} />, document.getElementById('leftBox'));
	ReactDOM.TAO.load('rightBox', <TaoContent param={{}} />, document.getElementById('rightBox'));
});

