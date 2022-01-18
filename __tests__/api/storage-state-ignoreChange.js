/* global describe, it, expect, jest */
jest.useFakeTimers()
require('../_full_api_test')

describe('Storage states ignoreChane bug', function () {
  it('creates new storage with a new state. Check does ignoreChange disables callback is called inside called callback .', function () {
    const vcCake = require('../../index')
    const testValue = 'value'
    const stateThatMustBeSet = 'new value 2'
    const test = vcCake.getStorage('test')
    const stateChecking = test.state('checking')
    const state2Checking = test.state('checking2')
    // Create custom function
    const removeFn = function () {
      stateChecking.ignoreChange(myFunc2)
    }
    const myFunc = function () {
      state2Checking.set(testValue)
      removeFn()
    }
    const myFunc2 = function () {
      state2Checking.set(stateThatMustBeSet)
    }
    stateChecking.set(true)
    setTimeout(function () {
      stateChecking.onChange(myFunc)
      stateChecking.onChange(myFunc2)
    }, 1)
    setTimeout(function () {
      stateChecking.set(false)
    }, 3)
    jest.runAllTimers()
    expect(state2Checking.get()).toBe(stateThatMustBeSet)
  })
})
