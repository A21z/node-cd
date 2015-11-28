var config = require('../../config.js')

exports.index = function (req, res) {
  res.json({status: 'ok'})
}

exports.favicon = function (req, res) {
  res.writeHead(404)
  res.end()
}

exports.contentful = function (req, res) {
  var headers = req.headers

  console.log('From IP Address:', req.ip)
  console.log('headers', headers)

  if (headers && (headers['x-contentful-topic'] === 'ContentManagement.Entry.publish' ||
                  headers['x-contentful-topic'] === 'ContentManagement.Entry.unpublish')) {
    console.log('Executing bash file...')
    myExec(config.action.exec.contentful)
    res.writeHead(200)
  } else {
    res.writeHead(403)
  }

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
