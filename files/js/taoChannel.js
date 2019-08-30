function classTAO(linkHost) {
    this.init = function() {
        let me = this;
        me.host = '';
        me._ITV = setInterval(
            function() {
                if (typeof window == 'undefined' || me.host === window.location.hostname) {
                    clearInterval(me._ITV);
                    return true;
                } else {
                    me.host = location.hostname;
                    me.loadjscssfile('https://' + me.getLocalLink(me.host) + '/package/Tao.jsx', 'js');
                    me.loadjscssfile('https://' + me.getLocalLink(me.host) + '/package/Tao.css', 'css');
                    console.log('===>' + me.getLocalLink(me.host));
                }

            }, 100
        )
    }
    this.getLocalLink = function(host) {
        let me = this;
        let v0 = host.match(/^(([^\.]+)\.|)(taobase\.com|google\.win)(|\:([0-9]+))$/i), v = null;
        let link_env = '';
        if (!v0) {
            link_env = '';
        } else {
            v = v0[1].match(/(([a-z]+)\_|)(dev|qa|www)/i);
            link_env = (!v || v[0] === 'www') ? ('prod.' + linkHost) : (v[0] + '.' + linkHost);
        }
        return  link_env;
    }
    this.loadjscssfile= function(filename, filetype){
        if (filetype=="js"){ //if filename is a external JavaScript file
            var fileref=document.createElement('script')
            fileref.setAttribute("type","text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
    this.init();
}

var TAO = new classTAO('shusiou.win');
