let fn = TAO.env.config_path + '/rule_dns.txt';
TAO.pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      TAO.res.send(false);
    } else {
      var DL =  [], DS = {};
      try { DL = data.split("\n"); } catch(e) {}
      for (var i = 0; i < DL.length; i++) {
            DL[i] = DL[i].split('=>');
            if (DL[i].length == 2) {
                DS[decodeURIComponent(DL[i][0].replace(/^\s+|\s+$/gm,''))] = decodeURIComponent(DL[i][1].replace(/^\s+|\s+$/gm,''))
            }
      } 
        var name = 'tao_jxu_dev.shusiou.win';
    for (var key in DS) {
        var re = new RegExp(key, 'ig');
        if (re.test(name)) {
            TAO.res.send([{ 
                name: name,
                type: 'A',
                class: 'IN',
                ttl: 600,
                data: DS[key]
            }]);
        }
    }
  
      TAO.res.send('DR');
 
    
});
