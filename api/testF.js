let name = 'taop_jxu_dev.shusiou.win';

let fn = TAO.env.config_path + '/rule_dns.data';
TAO.pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      TAO.res.send(false);
    } else {
      var DL =  [];
      try { DL = data.split("\n"); } catch(e) {}
      for (var i = 0; i < DL.length; i++) {
            DL[i] = DL[i].split('=>');
            if (DL[i].length == 2) {
                let key = DL[i][0].replace(/^\s+|\s+$/gm,''),
                    ip =  DL[i][1].replace(/^\s+|\s+$/gm,'');
                
                var re = new RegExp(key, 'ig');
                if (re.test(name)) {
                    TAO.res.send([{ 
                        name: name,
                        type: 'A',
                        class: 'IN',
                        ttl: 600,
                        data: ip
                    }]);
                    return true
                }
            }
      } 
      TAO.res.send('DR--');
    }
    
});
