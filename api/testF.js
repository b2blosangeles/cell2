let fn = TAO.env.config_path + '/rule_dns.txt';
TAO.pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      TAO.res.send(false);
    } else {
      var DS = {};
      try { DS = JSON.parse(data); } catch(e) {}

      TAO.res.send(DS);
    }
    
});
