/* global it, expect */

const vcCake = require('../../index')

module.exports = function (tests) {
  tests.forEach(function (action) {
    action.callback(vcCake)
  })
  vcCake.start().end(function () {
    tests.forEach(function (action) {
      it(action.comment, function () {
        const expected = expect(action.value)
        expected[action.expect || 'toBe'](action.toBe)
      })
    })
  })
}
