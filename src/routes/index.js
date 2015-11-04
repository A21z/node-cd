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

exports.contentful = function(req, res){
  var authorizedIps = config.security.authorizedIps;
  var contentfulIps = config.security.contentfulIps;

  var payload = req.body;

  console.log('From IP Address:', req.ip);
  console.log('payload', payload);

//  if (payload && (authorizedIps.indexOf(req.ip) >= 0 || contentfulIps.indexOf(req.ip) >= 0)){
//    var commits = JSON.parse(payload).commits;
//    var commitsFromBranch = commits.filter(function(commit) {
//      return commit.branch === config.repository.branch || commit.branch === 'refs/heads/master' || commit.branch === 'refs/heads/develop';
//    });
//
//    if (commitsFromBranch.length > 0){
//      myExec(config.action.exec.bitbucket);
//    }
//
//    res.writeHead(200);
//  } else {
//    res.writeHead(403);
//  }
//  res.end();
};

exports.bitbucket = function(req, res){
  var authorizedIps = config.security.authorizedIps;
  var bitbucketIps = config.security.bitbucketIps;
  
  var payload = req.body.payload;
  
  console.log('From IP Address:', req.ip);
  console.log('payload', payload);

  if (payload && (authorizedIps.indexOf(req.ip) >= 0 || bitbucketIps.indexOf(req.ip) >= 0)){  
    var commits = JSON.parse(payload).commits;  
    var commitsFromBranch = commits.filter(function(commit) {
      return commit.branch === config.repository.branch || commit.branch === 'refs/heads/master' || commit.branch === 'refs/heads/develop';
    });

    if (commitsFromBranch.length > 0){
      myExec(config.action.exec.bitbucket);
    }

    res.writeHead(200);
  } else {
    res.writeHead(403);
  }
  res.end();
};

exports.github = function(req, res){
  var authorizedIps = config.security.authorizedIps;
  var githubIps = config.security.githubIps;
  var payload = req.body.payload;

  console.log('From IP Address:', req.ip);
  console.log('payload', payload);

  if (payload && (inAuthorizedSubnet(req.ip) || authorizedIps.indexOf(req.ip) >= 0 || githubIps.indexOf(req.ip) >= 0)){
    payload = JSON.parse(payload);

    if (payload.ref === config.repository.branch || payload.ref === 'refs/heads/master' || payload.ref === 'refs/heads/develop'){
      myExec(config.action.exec.github);
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
    var exec = require('child_process').exec;
    var execCallback = function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    }
    var child = exec(line, execCallback);
}
