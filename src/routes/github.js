var Netmask = require('netmask').Netmask
var config

function GitHub (conf) {
  config = conf
}

function create (conf) {
  return new GitHub(conf)
}

module.exports.create = create

GitHub.prototype.post = function (req, res) {
  var authorizedIps = config.security.authorizedIps
  var githubIps = config.security.githubIps
  var payload = req.body

  if (!payload) {
    console.log('No payload')
    res.writeHead(400)
    res.end()
    return
  }

  if (!(inAuthorizedSubnet(req.ip) || authorizedIps.indexOf(req.ip) >= 0 || githubIps.indexOf(req.ip) >= 0)) {
    console.log('Unauthorized IP:', req.ip)
    res.writeHead(403)
    res.end()
    return
  }

  payload = JSON.parse(payload)

  if (payload.ref === config.repository.branch ||
    payload.ref === 'refs/heads/master' ||
    payload.ref === 'refs/heads/develop') {
    myExec(config.action.exec.github)
  }

  res.writeHead(200)
  res.end()
}

var inAuthorizedSubnet = function (ip) {
  var authorizedSubnet = config.security.githubAuthorizedSubnets.map(function (subnet) {
    return new Netmask(subnet)
  })
  return authorizedSubnet.some(function (subnet) {
    return subnet.contains(ip)
  })
}

var myExec = function (line) {
  var exec = require('child_process').exec
  var execCallback = function (error) {
    if (error !== null) {
      console.log('exec error: ' + error)
    }
  }
  exec(line, execCallback)
}
