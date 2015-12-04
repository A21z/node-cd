exports.index = function (req, res) {
  res.json({status: 'ok'})
}

exports.favicon = function (req, res) {
  res.writeHead(404)
  res.end()
}
