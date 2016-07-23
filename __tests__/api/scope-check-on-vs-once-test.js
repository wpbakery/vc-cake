/* global describe */

var times = require('lodash').times

require('../_full_api_test')
var testEvents = require('../test-libs/test-events')
describe('running scope api check on/once', function () {
  testEvents([
    {
      comment: 'create 2 modules and check module event on three times',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          times(settings.toBe, function () { api.notify('hello') })
        })
        vcCake.add('test-2', function (api) {
          api.module('test').on('hello', function () {
            settings.value++
          })
        })
      }
    },
    {
      comment: 'create 2 modules and check once time subscription',
      value: 0,
      toBe: 1,
      callback: function (vcCake) {
        var settings = this
        vcCake.add('test', function (api) {
          times(settings.toBe * 4, function () { api.notify('hello-once') })
        })
        vcCake.add('test-2', function (api) {
          api.module('test').once('hello-once', function () {
            settings.value++
          })
        })
      }
    }
  ])
})
