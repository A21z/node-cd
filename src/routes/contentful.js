var config

function Contentful (conf) {
  config = conf
}

function create (conf) {
  return new Contentful(conf)
}

module.exports.create = create

Contentful.prototype.post = function (req, res) {
  var headers = req.headers

  console.log('From IP Address:', req.ip)
  console.log('headers', headers)

  if (!(headers && (headers['x-contentful-topic'] === 'ContentManagement.Entry.publish' ||
                    headers['x-contentful-topic'] === 'ContentManagement.Entry.unpublish'))) {
    res.writeHead(403)
    res.end()
    return
  }

  console.log('Executing bash file...')
  myExec(config.action.exec.contentful)
  res.writeHead(200)
  res.end()
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
