var config = require('../../config.js');

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
	if (payload && authorizedIps.indexOf(req.ip) >= 0) {
		console.log('It\'s payload time!');
		myExec(config.action.exec);
		res.writeHead(200);
	} else {
		res.writeHead(403);
	}
	res.end();
};

var myExec = function(line) {
    var exec = require('child_process').exec;
	var execCallback = function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    }
	}
	var child = exec(line, execCallback);
}
