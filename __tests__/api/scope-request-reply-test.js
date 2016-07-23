/* global describe */

require('../_full_api_test')
var testEvents = require('../test-libs/test-events')
describe('running scope api check request/reply', function () {
  testEvents([
    {
      comment: 'create 2 modules and check reply from test to test-2 scope',
      value: false,
      toBe: true,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          api.request('hello')
        })
        vcCake.add('test-2', function (api) {
          api.reply('hello', function () {
            settings.value = settings.toBe
          })
        })
      }
    },
    {
      comment: 'create 1 module and call add reply before request',
      value: false,
      toBe: true,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test-same', function (api) {
          api.reply('hello', function () {
            settings.value = settings.toBe
          })
          api.request('hello')
        })
      }
    }
  ])
})
