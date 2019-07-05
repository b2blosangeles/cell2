$(document).ready(function() {
	ReactDOM.TAO.append('Root', <TAORoot param={{}} />, document.body);
	ReactDOM.TAO.load('topMenu', <TopMenu param={{}} />, document.getElementById('topMenu'));
	ReactDOM.TAO.load('leftBox', <LeftBox param={{}} />, document.getElementById('leftBox'));
	ReactDOM.TAO.load('rightContent', <RightContent param={{}} />, document.getElementById('rightContent'));
});

