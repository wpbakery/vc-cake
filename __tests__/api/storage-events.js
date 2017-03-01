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
          var testStorage = vcCake.getStorage('test-0')
          times(settings.toBe + 1, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-0', function (storage) {
          var callbackFunction = function () {
            settings.value += 1
            if (settings.value === 2) {
              storage.off(actionName, callbackFunction)
            }
          }
          storage.on(actionName, callbackFunction)
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
          var testStorage = vcCake.getStorage('test-1')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-1', function (storage) {
          var callbackFunction = function () {
            settings.value += 1
          }
          storage.once(actionName, callbackFunction)
        })
      }
    },
    {
      comment: 'creates modules and checks storage off once method',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function () {
          var testStorage = vcCake.getStorage('test-2')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-2', function (storage) {
          settings.value += 1
          var callbackFunction = function () {
            settings.value += 1
          }
          storage.once(actionName, callbackFunction)
          storage.offOnce(actionName, callbackFunction)
        })
      }
    }
  ])
})
