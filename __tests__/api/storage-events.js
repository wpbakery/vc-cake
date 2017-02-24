/* global describe */
var times = require('lodash').times

require('../_full_api_test')
var testEvents = require('../test-libs/test-events')
describe('running storage on/off', function () {
  var actionName = 'testAction'
  testEvents([
    {
      comment: 'creates modules and checks storage events on/off',
      value: 0,
      toBe: 2,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function () {
          var testStorage = vcCake.getStorage('test')
          times(settings.toBe + 1, function () { testStorage.trigger(actionName) })
        })
        vcCake.add('test-2', function () {
          var testStorage = vcCake.getStorage('test')
          var callbackFunction = function () {
            settings.value += 1
            if (settings.value === 2) {
              testStorage.off(actionName, callbackFunction)
            }
          }
          testStorage.on(actionName, callbackFunction)
        })
      }
    },
    {
      comment: 'creates modules and checks storage once event',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function () {
          var testStorage = vcCake.getStorage('test')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.add('test-2', function () {
          var testStorage = vcCake.getStorage('test')
          var callbackFunction = function () {
            settings.value += 1
          }
          testStorage.once(actionName, callbackFunction)
        })
      }
    },
    {
      comment: 'creates modules and checks storage off once method',
      value: 0,
      toBe: 0,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function () {
          var testStorage = vcCake.getStorage('test')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.add('test-2', function () {
          var testStorage = vcCake.getStorage('test')
          var callbackFunction = function () {
            settings.value += 1
          }
          testStorage.once(actionName, callbackFunction)
          testStorage.offOnce(actionName, callbackFunction)
        })
      }
    }
  ])
})
