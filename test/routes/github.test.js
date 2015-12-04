var test = require('tape').test
var githubController = require('../../src/routes/github.js')

test('The GitHub endpoint with authorized IP should return 200', (assert) => {
  var github = githubController.create({
    security: {
      authorizedIps: ['1.2.3.4'],
      githubAuthorizedSubnets: [],
      githubIps: []
    },
    repository: {
      branch: 'master'
    }
  })

  var req = {
    ip: '1.2.3.4',
    body: {'dummy': true}
  }
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 200)
    assert.end()
  }

  github.post(req, res)
})

test('The GitHub endpoint with authorized IPv6 should return 200', (assert) => {
  var github = githubController.create({
    security: {
      authorizedIps: ['1.2.3.4'],
      githubAuthorizedSubnets: ['1.2.3.4/24'],
      githubIps: []
    },
    repository: {
      branch: 'master'
    }
  })

  var req = {
    ip: '::ffff:1.2.3.4',
    body: {'dummy': true}
  }
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 200)
    assert.end()
  }

  github.post(req, res)
})

test('The GitHub endpoint with authorized GitHub IP should return 200', (assert) => {
  var github = githubController.create({
    security: {
      authorizedIps: [],
      githubAuthorizedSubnets: [],
      githubIps: ['1.2.3.4']
    },
    repository: {
      branch: 'master'
    }
  })

  var req = {
    ip: '1.2.3.4',
    body: {'dummy': true}
  }
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 200)
    assert.end()
  }

  github.post(req, res)
})

test('The GitHub endpoint with unauthorized GitHub IP should return 403', (assert) => {
  var github = githubController.create({
    security: {
      authorizedIps: [],
      githubAuthorizedSubnets: [],
      githubIps: []
    },
    repository: {
      branch: 'master'
    }
  })

  var req = {
    ip: '1.2.3.4',
    body: {'dummy': true}
  }
  var res = {}
  var code

  res.writeHead = function (statusCode) {
    code = statusCode
  }

  res.end = function () {
    assert.equal(code, 403)
    assert.end()
  }

  github.post(req, res)
})
