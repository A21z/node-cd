var config = require('../../config.js');
var Netmask = require('netmask').Netmask

var authorizedSubnet =  config.security.authorizedSubnet.map(function(subnet){
	return new Netmask(subnet)
})

exports.index = function(req, res){
  res.json( { status: 'ok' });
};

exports.favicon = function(req, res){
  res.writeHead(404);
  res.end();
};

exports.github = function(req, res){
  authorizedIps = config.security.authorizedIps;
  var payload = req.body.payload;
  console.log('From IP Address:', req.ip);
  console.log('payload', payload);
  if (payload && (inAuthorizedSubnet(req.ip) || authorizedIps.indexOf(req.ip) >= 0)) {

    payload = JSON.parse(payload);
    if (payload.ref === 'refs/heads/master'
			|| payload.ref === 'refs/heads/develop') {
      myExec(config.action.exec + ' ' + payload.repository.name);
    }
    res.writeHead(200);
  } else {
    res.writeHead(403);
  }
  res.end();
};

var inAuthorizedSubnet = function(ip) {
	return authorizedSubnet.some(function(subnet) {
		return subnet.contains(ip)
	})
}

var myExec = function(line) {
    console.log('Executing: ' + line);
    var exec = require('child_process').exec;
    var execCallback = function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
    var child = exec(line, execCallback);
    
    child.stdout.on('data', function (data) {
	console.log(data);
    });

    child.stderr.on('data', function (data) {
	console.log(data);
    });

}
