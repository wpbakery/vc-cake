/* global describe */
const times = require('lodash').times

require('../_full_api_test')
const testEvents = require('../test-libs/test-events')
describe('running storage on/off', function () {
  const actionName = 'testAction'
  testEvents([
    {
      comment: 'creates modules and checks storage events on/off',
      value: 0,
      toBe: 2,
      callback: function (vcCake) {
        const settings = this
        vcCake.add('test-storage-1', function () {
          const testStorage = vcCake.getStorage('test-0')
          times(settings.toBe + 1, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-0', function (storage) {
          const callbackFunction = function () {
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
        const settings = this
        vcCake.add('test-storage-2', function () {
          const testStorage = vcCake.getStorage('test-1')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-1', function (storage) {
          const callbackFunction = function () {
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
        const settings = this
        vcCake.add('test-storage-3', function () {
          const testStorage = vcCake.getStorage('test-2')
          times(settings.toBe + 3, function () { testStorage.trigger(actionName) })
        })
        vcCake.addStorage('test-2', function (storage) {
          settings.value += 1
          const callbackFunction = function () {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-a')
        const eventName = 'testPublicEvent'
        let counter = 1
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
        const settings = this
        const testStorage = vcCake.getStorage('test-b')
        const eventName = 'testPublicEventOnce'
        let counterZ = 1
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
        const settings = this
        const testStorage = vcCake.getStorage('test-c')
        const eventName = 'testPublicEventOff'
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-d')
        const eventName = 'test_custom_event test_custom_event2'
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-d')
        const eventName = 'test_custom_event    test_custom_event2   '
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-e')
        const eventName = 'test_custom_event test_custom_event2'
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-f')
        const eventName = 'testf_custom_event testf_custom_event2'
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-g')
        const eventName = 'testg_custom_event     testg_custom_event2'
        let counterX = 1
        const callBackFunction = function (value) {
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
        const settings = this
        const testStorage = vcCake.getStorage('test-h')
        const eventName = 'testh_custom_event     testh_custom_event2    '
        let counterX = 1
        const callBackFunction = function (value) {
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
