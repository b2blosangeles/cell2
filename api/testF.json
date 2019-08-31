let fn = env.config_path + '/dynamic_dns.json';
pkg.fs.readFile(fn, 'utf8', function read(err, data) {
    if (err) {
      res.send(false);
    } else {
      var DS = {};
      try { DS = JSON.parse(data); } catch(e) {}

      res.send(DS);
    }
});
