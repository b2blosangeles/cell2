var host = 'jxu_qa.taobase.com', link_host = 'channel.shusiou.win';

function localLink(host, link_host) {
    let v0 = host.match(/^(([^\.]+)\.|)(taobase\.com|shusiou\.win)(|\:([0-9]+))$/i), v = null;
    let link_env = '';
    if (!v0) {
        link_env = '';
    } else {
        console.log(v0[3]);
        v = v0[1].match(/(([a-z]+)\_|)(dev|qa|www)/i);
        link_env = (!v || v[0] === 'www') ? ('prod.' + link_host) : (v[0].replace(/\_/ig, '.') + '.' + link_host);
    }
    return  link_env;
}

var l = [
    'taobase.com',
    'dev.taobase.com',
    'qa.taobase.com',
    'www.taobase.com',
    'jxu_qa.taobase.com',
    'jxu_dev.taobase.com',
    'jxu_www.taobase.com'
];

for (var i = 0; i < l.length; i++) {
    console.log(l[i] + '->' + localLink(l[i], 'channel.shusiou.win'));


}
