let fn = TAO.env.config_path + '/rule_dns.txt';
TAO.pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      TAO.res.send(false);
    } else {
      var DL =  [];
      try { DL = data.split("\n"); } catch(e) {}
      for (var i = 0; i < DL.length; i++) {
        DL[i] = DL[i].split('=>');
      }  
      TAO.res.send(DL);
    }
    
});
