/* global describe */

const times = require('lodash').times

require('../_full_api_test')
const testEvents = require('../test-libs/test-events')
describe('running scope api check on/once', function () {
  testEvents([
    {
      comment: 'create 2 modules and check module event on three times',
      value: 0,
      toBe: 3,
      callback: function (vcCake) {
        const settings = this
        vcCake.add('test-1', function (api) {
          times(settings.toBe, function () {
            api.notify('hello')
          })
        })
        vcCake.add('test-2', function (api) {
          api.module('test-1').on('hello', function () {
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
        const settings = this
        vcCake.add('test-3', function (api) {
          times(settings.toBe * 4, function () { api.notify('hello-once') })
        })
        vcCake.add('test-4', function (api) {
          api.module('test-3').once('hello-once', function () {
            settings.value++
          })
        })
      }
    }
  ])
})
