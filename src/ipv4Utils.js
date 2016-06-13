var Ipv4Utils = function () {
}

Ipv4Utils.prototype = {
  getIpv4FromReq: function (req, config) {
    var ip
    if (config.security.useIpFromHeader) {
      ip = req.get(config.security.useIpFromHeader)
    } else {
      ip = req.ip
    }
    return ip.replace('::ffff:', '')
  }
}

module.exports = Ipv4Utils
