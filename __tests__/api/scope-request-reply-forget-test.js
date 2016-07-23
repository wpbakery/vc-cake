/* global describe */
var times = require('lodash').times

require('../_full_api_test')
var testEvents = require('../test-libs/test-events')
describe('running scope api check request/reply', function () {
  testEvents([
    {
      comment: 'create 2 modules and check reply forget from test to test-2 scope calling hello event 3 times. But hook only twice',
      value: 0,
      toBe: 2,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          times(settings.toBe + 1, function () { api.request('hello') })
        })
        vcCake.add('test-2', function (api) {
          var callbackFunction = function () {
            settings.value++
            if (settings.value === 2) {
              api.forget('hello', callbackFunction)
            }
          }
          api.reply('hello', callbackFunction)
        })
      }
    },
    {
      comment: 'create 2 modules and check reply forget from test to test-2 scope',
      value: false,
      toBe: false,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          api.request('hello')
        })
        vcCake.add('test-2', function (api) {
          var eventFunction = function () {
            settings.value = true
          }
          api.reply('hello', eventFunction)
          api.forget('hello', eventFunction)
        })
      }
    }
  ])
})
