/* global describe */
var times = require('lodash').times

require('../_full_api_test')
var testEvents = require('../test-libs/test-events')
describe('running scope api check on/off', function () {
  testEvents([
    {
      comment: 'create module and check module event on three times',
      value: 0,
      toBe: 2,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          times(settings.toBe + 1, function () { api.notify('hello') })
        })
        vcCake.add('test-2', function (api) {
          var callbackFunction = function () {
            settings.value++
            if (settings.value === 2) {
              api.module('test').off('hello', callbackFunction)
            }
          }
          api.module('test').on('hello', callbackFunction)
        })
      }
    }
  ])
})
