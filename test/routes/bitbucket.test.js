var test = require('tape').test
var bitbucketController = require('../../src/routes/bitbucket.js')
var Ipv4Utils = require('../../src/Ipv4Utils.js')

function mockReq () {
  return {
    ip: '::ffff:1.2.3.4',
    body: {
      push: {
        changes: [{
          new: {
            name: 'dummy'
          }
        }]
      }
    }
  }
}

test('The Bitbucket endpoint with non-push payload should return 204', (assert) => {
  var bitbucket = bitbucketController.create({
    security: {
      authorizedIps: ['1.2.3.4'],
      bitbucketIps: []
    },
    repository: {
      branch: 'master'
    },
    action: {
      exec: {
        bitbucket: '../bitbucket.sh'
      }
    }
  }, Ipv4Utils)

  var req = { ip: '::ffff:1.2.3.4', body: {} }
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 204)
    assert.end()
  }

  bitbucket.post(req, res)
})

test('The Bitbucket endpoint with authorized IP should return 200', (assert) => {
  var bitbucket = bitbucketController.create({
    security: {
      authorizedIps: ['1.2.3.4'],
      bitbucketIps: []
    },
    repository: {
      branch: 'master'
    },
    action: {
      exec: {
        bitbucket: '../bitbucket.sh'
      }
    }
  }, Ipv4Utils)

  var req = mockReq()
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 200)
    assert.end()
  }

  bitbucket.post(req, res)
})

test('The Bitbucket endpoint with unauthorized IP should return 403', (assert) => {
  var bitbucket = bitbucketController.create({
    security: {
      authorizedIps: [],
      bitbucketIps: []
    },
    repository: {
      branch: 'master'
    },
    action: {
      exec: {
        bitbucket: '../bitbucket.sh'
      }
    }
  }, Ipv4Utils)

  var req = mockReq()
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 403)
    assert.end()
  }

  bitbucket.post(req, res)
})
