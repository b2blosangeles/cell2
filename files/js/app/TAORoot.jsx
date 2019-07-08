class TAORoot extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.popupSetting = '';
		this.spinPool={};
		this.sno = 0;
		this.state = {_spinner : {}};
	}
	componentDidMount() {
		var me = this; 
	}
	dataEngine(cfg) {
		var me = this;
		
		var code = me.spinOn((cfg.spinner) ? {spinner : cfg.spinner} : {});
		
		$.ajax({
			type: (cfg.type) ? cfg.type : 'POST',
			url: cfg.url,
			data: (cfg.data) ? cfg.data : {},
			dataType: (cfg.dataType) ? cfg.dataType : 'JSON',
			timeout: (cfg.timeout) ? cfg.timeout : 8000,
			success: function(resultData){
				me.spinOff(code);
				if  (typeof cfg.success == 'function') {
					cfg.success(resultData)
				}
			},
			error : function(xhr, textStatus, error) {
				me.spinOff(code);
				if  (typeof cfg.error == 'function') {
					cfg.error(error)
				}
			}
		});
	}
	componentDidUpdate(prevProps, prevState) {
		var me = this;
	}
	getSno() {
		var me = this;
		me.sno = (!me.sno || me.sno > 1000000) ? 1 : (me.sno + 1);
		return 'SNO-' + me.sno + '-' + new Date().getTime();
	}
	popup(setting) {
		var me = this;
		me.popupSetting = setting;
		me.setState({_popup : true})
		setTimeout(function() { 
			me.animationIn();
		});
	}
	closePopup() {
		var me = this;
		me.popupSetting = null;
		me.animationOut(function() {
			me.setState({_popup : false})
		});
	}
	animationIn() {
		// 'puff', 'clip', 'explode', 'fold', 'slide'
		// var Effect_a = ['puff', 'clip', 'fold', 'slide', 'drop'],
		var Effect_a = ['clip', 'fold'],
		    direction_a = ['up', 'down', 'left', 'right'],
		    Effect = Effect_a[Math.floor(Math.random() * Effect_a.length)],
		    direction = direction_a[Math.floor(Math.random() * direction_a.length)];		
		$('.overlay_popup_page').hide().show( Effect,  600 )
	}
	animationOut(cbk) {
		// 'puff', 'clip', 'explode', 'fold', 'slide'
		// var Effect_a = ['puff', 'clip', 'fold', 'slide', 'drop'],
		// $('.overlay_popup_page').toggle( Effect,  {direction: direction}, 600 ,
		var Effect_a = ['clip', 'fold'],
		    direction_a = ['up', 'down', 'left', 'right'],
		    Effect = Effect_a[Math.floor(Math.random() * Effect_a.length)],
		    direction = direction_a[Math.floor(Math.random() * direction_a.length)];
		
		$('.overlay_popup_page').toggle( Effect, 600 ,
			function() {
				cbk();
			});
	}
	showPopup() {
		var me = this;
		var v = me.popupSetting;
		
		var classType = (!v || !v.type) ? 'light' : v.type;
		var className = ((!v || !v.class) ? 
			    (' shadow rounded border border-secondary alert-' + classType) : v.class + ' ') +
			    ' p-2';
		var style = (!v || !v.style) ? {'min-height' : '28em'} : v.style;
		var closeIcon = (!v || !v.closeIcon) ? (<span/>) : (<button type="button" 
				className="close pull-right" onClick={me.closePopup.bind(me)}>
							  <span>&times;</span>
							</button>);
		return (me.state._popup) ? (<span><span className="overlay_popup_cover"></span>   
			<span id={'nnuu'} className="overlay_popup_page">
				<div className="container">
				<div className="row ">
					<div className="col-sm-12">
						<div className={className} style={style}>{closeIcon}
						{(typeof v.data === 'string') ? 
						(<span dangerouslySetInnerHTML={{__html: v.data}}/>)
						: v.data}
						</div>
					</div>
				</div>
				</div>				
			</span>
			</span>) : (<span></span>)		
	}		
	showSpinner(spinner) {
		var me = this;
		if (!spinner) {
			return (me.state._spinner.ALL) ? (<span><span className="overlay_spin_cover"></span>
				<span className="overlay_spin_page"><span className="spinner"></span></span>
				</span>) : (<span></span>)			
		} else {
			return (me.state._spinner.ALL) ? (<span></span>) : (me.state._spinner[spinner.SPID]) ? (<span>
				<span className="section_spin_cover"><span className="spinner"></span></span>
				</span>) : (<span></span>)
		}
	}
	spinOn (setting) {
		var me = this, tm = new Date().getTime();
		if (!setting) var setting = {};
		var code = me.getSno();
		var s = tm + ((setting.delay) ?  setting.delay : 0)
		var e = s + ((setting.max) ?  setting.max : (600 * 1000))
		
		if (setting.spinner) {
			setting.spinner.SPID = me.getSno();
			me.spinPool[code] = {spinner: setting.spinner.SPID, start : s, end : e};
		} else {
			me.spinPool[code] = {start : s, end : e};
		}
		if (!me.watchItv) {
			me.scanSpin()();
			me.watchItv = setInterval(me.scanSpin(),100); 
		}
		return code;
	}
	spinOff(code) {
		var me = this;
		delete me.spinPool[code];
	}
	isEquivalent(a, b) {
	    var aP = Object.keys(a), bP = Object.keys(b);
	    if (aP.length != bP.length) { return false; }
	    for (var i = 0; i < aP.length; i++) {
		var n = aP[i];
		if (a[n] !== b[n]) { return false; }
	    }
	    return true;
	}
	scanSpin() {
		var me = this;
		return function() {
			var tm = new Date().getTime();
			var spinner = {}, SpinnerChanged = false, oldSpinner = me.state._spinner;
			for (var v in me.spinPool) {
				if ((tm - me.spinPool[v].end) > 0) {
					delete me.spinPool[v];
				}
			}
			for (var v in me.spinPool) {
				if ((tm - me.spinPool[v].start) > 0) {
					if (me.spinPool[v].spinner) {
						spinner[me.spinPool[v].spinner] = true;
					} else {
						spinner.ALL = true;
					}
				}
			}
			if (!me.isEquivalent(spinner, oldSpinner)) {
				if (Object.keys(spinner).length == 0) {
					clearInterval(me.watchItv);
					delete me.watchItv;
				}
				me.setState({_spinner: spinner});
				ReactDOM.TAO.setState('*', {});
			}
		}
	}
	render() {
		var me = this;
		return (<span>{me.showSpinner()} {me.showPopup()}</span>);
	}
}
