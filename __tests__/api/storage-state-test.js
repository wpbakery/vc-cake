/* global describe, it, expect */

require('../_full_api_test')

describe('Storage states', function () {
  it('creates new storage with a new state. Does it stores value.', function () {
    const vcCake = require('../../index')
    const testValue = 'new value'
    const test = vcCake.getStorage('test')
    const stateChecking = test.state('checking')
    stateChecking.set(testValue)
    expect(stateChecking.get()).toBe(testValue)
  })
  it('creates new storage with a new state. Check does onChange is triggered when new data set.', function () {
    const vcCake = require('../../index')
    const testValue = 'new value 2'
    const test = vcCake.getStorage('test')
    const stateChecking = test.state('checking')
    stateChecking.onChange(function (value) {
      expect(value).toBe(testValue)
    })
    stateChecking.set(testValue)
  })
  it('creates new storage with a new state. Check does ignore Changes is triggered when new data set.', function () {
    const vcCake = require('../../index')
    const testValue = 'new value 2'
    const test = vcCake.getStorage('testIgnore')
    const stateChecking = test.state('checking')
    let counter = 0

    const callbackToCall = function (value) {
      expect(value).toBe(testValue)
      counter += 1
    }
    stateChecking.onChange(callbackToCall)
    stateChecking.set(testValue)
    stateChecking.ignoreChange(callbackToCall)
    stateChecking.set('newValue not observable value')
    expect(counter).toBe(1)
  })
  it('add storage state and then remove it', function () {
    const vcCake = require('../../index')
    const testValue = 'value to delete'
    const testStorage = vcCake.getStorage('test')
    testStorage.state('testing').set(testValue)
    testStorage.state('testing').delete()
    expect(testStorage.state('testing').get()).toBe(undefined)
  })
})
