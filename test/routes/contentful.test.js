var test = require('tape').test
var contentfulController = require('../../src/routes/contentful.js')

test('The Contentful endpoint with correct header should return 200', (assert) => {
  var contentful = contentfulController.create({
    action: {
      exec: {
        contentful: 'echo "test" > /dev/null'
      }
    }
  })

  var req = {
    ip: '1.2.3.4',
    headers: {
      'x-contentful-topic': 'ContentManagement.Entry.publish'
    }
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

  contentful.post(req, res)
})

test('The Contentful endpoint with bad header should return 403', (assert) => {
  var contentful = contentfulController.create({})

  var req = {
    ip: '1.2.3.4'
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

  contentful.post(req, res)
})
