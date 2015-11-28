/* eslint-env node, mocha */

var assert = require('assert')
var githubController = require('../../src/routes/github.js')

describe('The GitHub endpoint', function () {
  describe('with authorized IP', function () {
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
      body: {
        payload: '{"dummy": true}'
      }
    }
    var res = {}

    it('should return 200', function () {
      var code
      var endCalled = false

      res.writeHead = function (statusCode) {
        code = statusCode
      }

      res.end = function () {
        assert.equal(code, 200)
        endCalled = true
      }

      github.post(req, res)
      assert.equal(endCalled, true)
    })
  })
  describe('with GitHub authoried IP', function () {
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
      body: {
        payload: '{"dummy": true}'
      }
    }
    var res = {}

    it('should return 200', function () {
      var code
      var endCalled = false

      res.writeHead = function (statusCode) {
        code = statusCode
      }

      res.end = function () {
        assert.equal(code, 200)
        endCalled = true
      }

      github.post(req, res)
      assert.equal(endCalled, true)
    })
  })
  describe('with unauthorized IP', function () {
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
      ip: '1.2.3.5',
      body: {
        payload: '{"dummy": true}'
      }
    }
    var res = {}

    it('should return 403', function () {
      var code
      var endCalled = false

      res.writeHead = function (statusCode) {
        code = statusCode
      }

      res.end = function () {
        assert.equal(code, 403)
        endCalled = true
      }

      github.post(req, res)
      assert.equal(endCalled, true)
    })
  })
})
