class GitForm extends React.Component {
  constructor(props) {
	super(props);
	this.props = props;
	this.state = {branches : []};
  }
  componentDidMount() {
	var me = this;
  }
  isValidGitUrl() {
	let me = this, patt = /^(https|git)(:\/\/|@)([^\/:]+)[\/:]([^\/:]+)\/(.+).git$/ig;		      
	return (!patt.test(me.state.github)) ? false : true;
  }
  isValidVSpace() {
	let me = this, patt = /^[a-z]([\-\_a-z0-9]+)/i;		      
	return (!me.state.vSpace || !patt.test(me.state.vSpace)) ? false : true;
  }
  submit() {
	var me = this;
	ReactDOM.TAO.dataEngine({
	     type: 'POST',
	     url: '/api/python.api',
	     data: {code : 'submitVSpace', vSpace : me.state.vSpace, github : me.state.github, 
		    branch : me.state.branch,  username : me.state.username,  password : me.state.password},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  if (resultData.status === 'success') {
		  	me.setState({errorMessage : 'Success submitted!', _TM : new Date().getTime()});
			location.reload();
		  } else {
		   	me.setState({errorMessage : resultData.errorMessage, _TM : new Date().getTime()});
		  }
	     },
	     error : function(errMessage) { 
		 me.setState({errorMessage : errMessage, _TM : new Date().getTime()});
	     }, 
	     spinner :  me // ReactDOM.TAO.list['Frame']	
	});
  }	
  getRemoteBranches() {
	var me = this;
	ReactDOM.TAO.dataEngine({
	     type: 'POST',
	     url: '/api/python.api',
	     data: {code : 'getRemoteBranches', gitUrl : me.state.github, username : me.state.username, password : me.state.password},
	     dataType: 'JSON',
	     timeout: (6 * 1000),
	     success: function(resultData){
		  if (resultData.status === 'success') {
		  	me.setState({branches : resultData.branches, errorMessage : null,  _TM : new Date().getTime()});
		  } else {
		   	me.setState({errorMessage : resultData.errorMessage, _TM : new Date().getTime()});
		  }
	     },
	     error : function(errMessage) { 
		  me.setState({branches : [], _TM : new Date().getTime()});
	     }, 
	     spinner : me	
	});
  }
  gitMaskAuth(str, user, pass) {
	let patt = new RegExp('\:\/\/([^\@]+\@|\@|)([^\/]+)', 'i');
        return (!user && !pass) ? str : str.replace(patt, '://[username]:[password]' +  '@$2');
  }	
  componentDidUpdate(prevProps, prevState) {
	var me = this;
	if (me.state.github != prevState.github || 
	    me.state.username != prevState.username || 
	    me.state.password != prevState.password) {
		if (me.isValidGitUrl()) {
			me.setState({gitMask : me.gitMaskAuth(me.state.github, me.state.username, me.state.password )});
		} else {
			me.setState({gitMask : null});
		}
	} 
  }
  selectBranch (v) {
	var me = this;
    	me.setState({branch : v});
  }
  myChangeHandler (v, event) {
	var me = this;
	var obj = {}; 
	obj[v] = event.target.value;
    	me.setState(obj);
  }
  isSubmitEnabled() {
	let me = this;
	return (me.isValidGitUrl() && (me.state.branch)  
		&& me.isValidVSpace(me.state.vSpace) 
		&& (me.state.branches.length)) ? true : false;
  }
  render() {
  	 var me = this;
	 var isEnabled = me.isSubmitEnabled();
	 return (<div className="border border-secondary alert-secondary rounded shadow p-2 rightBox-containner">
			<h3 className="p-3">Parking your github code</h3>	    
			<hr/>			    
			<form>
				<div className="container container-fluid">					
					<div className="row">
						<div className="col-sm-2 p-3">
							Github:
						</div>
						<div className="col-sm-10 p-2">
							<input type="text" className="form-control" value={me.state.github} onChange={this.myChangeHandler.bind(me, 'github')}/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-2 p-3">
							User:
						</div>
						<div className="col-sm-4 p-2">
							<input type="text" className="form-control" value={me.state.username} onChange={this.myChangeHandler.bind(me, 'username')}/>
						</div>
						<div className="col-sm-2 p-3">
							Password:
						</div>
						<div className="col-sm-4 p-2">
							 <input type="password" className="form-control" value={me.state.password} onChange={this.myChangeHandler.bind(me, 'password')}/>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-2 p-3"></div>
						<div className="col-sm-10 pl-3">
						{(!me.state.gitMask) ? '' : (' ** ' + me.state.gitMask)}</div>
					</div>	
					<div className="row">
						<div className="col-sm-2 p-3">
							{(!me.state.gitMask) ? '' : 'Branch'}
						</div>
						{(!me.state.gitMask) ? (<div className="col-sm-6 p-2"></div>) : 
						 (!me.state.branches || !me.state.branches.length) ? (
							<div className="col-sm-6 p-2">
								<input type="button" className="btn btn-warning" value="Get git branches" onClick={this.getRemoteBranches.bind(me)}/>
							</div>) :	
						(<div className="col-sm-6 p-3">
							<div className="dropdown">
							  <button className="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
							  {(!me.state.branch) ? 'Select Branch' : me.state.branch}
								  --={JSON.stringify(me.state.branches)}=--
							  <span className="caret"></span></button>
							  <ul className="dropdown-menu p-1 pl-3 branch_select" >
								{me.state.branches.map(function(item){
									return (<li><a href="#" onClick={me.selectBranch.bind(me, item)}>{item}</a></li>)
								 })}
								<li><a href="#" onClick={me.selectBranch.bind(me, 'it')}>it</a></li>
							  </ul>
							</div>
						</div>)}
						{(!me.isSubmitEnabled()) ?  (<div className="col-sm-4 p-3"></div>) : (<div className="col-sm-4 p-3">
							<input type="button" className="btn btn-warning"  
								disabled={!isEnabled} value="Submit" 
								onClick={this.submit.bind(me)} />
						</div>)}
					</div>
					
					<div className="row">
						<div className="col-sm-2 p-3"></div>
						<div className="col-sm-10 p-3 text-danger">
						{me.state.errorMessage}
							<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
						</div>
					</div>
				</div>
			</form>
			<hr/><br/>
			{ReactDOM.TAO.list.Root.showSpinner(me)}
	      </div>)
  }
}
