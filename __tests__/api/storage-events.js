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
        vcCake.add('test-storage-1', function () {
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
        vcCake.add('test-storage-2', function () {
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
        vcCake.add('test-storage-3', function () {
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
    },
    {
      comment: 'creates storage and checks storage trigger/on method in public',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-a')
        var eventName = 'testPublicEvent'
        var counter = 1
        testStorage.on(eventName, function (value) {
          settings.value = value
        })
        times(settings.toBe, function () { testStorage.trigger(eventName, counter++) })
      }
    },
    {
      comment: 'creates storage and checks storage once method in public',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-b')
        var eventName = 'testPublicEventOnce'
        var counterZ = 1
        testStorage.once(eventName, function (value) {
          settings.value = value
        })
        times(settings.toBe + 3, function () { testStorage.trigger(eventName, counterZ++) })
      }
    },
    {
      comment: 'creates storage and checks storage off method in public',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-c')
        var eventName = 'testPublicEventOff'
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off(eventName, callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(settings.toBe + 3, function () { testStorage.trigger(eventName, counterX++) })
      }
    },
    {
      comment: 'check multiple events',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-d')
        var eventName = 'test_custom_event test_custom_event2'
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off(eventName, callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(settings.toBe + 3, function () { testStorage.trigger('test_custom_event2', counterX++) })
      }
    },
    {
      comment: 'check multiple events with spaces',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-d')
        var eventName = 'test_custom_event    test_custom_event2   '
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off(eventName, callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(settings.toBe + 3, function () { testStorage.trigger('test_custom_event2', counterX++) })
      }
    },
    {
      comment: 'check multiple events off',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-e')
        var eventName = 'test_custom_event test_custom_event2'
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off(eventName, callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(settings.toBe + 3, function () {
          testStorage.trigger('test_custom_event2', counterX++)
          testStorage.trigger('test_custom_event', counterX++)
        })
      }
    },
    {
      comment: 'check multiple events off single',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-f')
        var eventName = 'testf_custom_event testf_custom_event2'
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off('testf_custom_event', callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(3, function () {
          testStorage.trigger('testf_custom_event2', counterX)
          testStorage.trigger('testf_custom_event', counterX)
          counterX++
        })
      }
    },
    {
      comment: 'check multiple events with spaces',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-g')
        var eventName = 'testg_custom_event     testg_custom_event2'
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off('testg_custom_event', callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(3, function () {
          testStorage.trigger('testg_custom_event2', counterX)
          testStorage.trigger('testg_custom_event', counterX)
          counterX++
        })
      }
    },
    {
      comment: 'check multiple events with spaces at end',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        var settings = this
        var testStorage = vcCake.getStorage('test-h')
        var eventName = 'testh_custom_event     testh_custom_event2    '
        var counterX = 1
        var callBackFunction = function (value) {
          settings.value = value
          testStorage.off('testh_custom_event', callBackFunction)
        }
        testStorage.on(eventName, callBackFunction)
        times(3, function () {
          testStorage.trigger('testh_custom_event2', counterX)
          testStorage.trigger('testh_custom_event', counterX)
          counterX++
        })
      }
    }
  ])
})
