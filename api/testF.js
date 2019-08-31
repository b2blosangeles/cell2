let fn = TAO.env.config_path + '/rule_dns.txt';
TAO.pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      TAO.res.send(false);
    } else {
      var DL =  [];
      try { DL = data.split("\n"); } catch(e) {}

      TAO.res.send(DL);
    }
    
});
