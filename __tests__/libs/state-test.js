/* global describe, it, expect */

require('../_full_api_test')
const methods = ['set', 'get', 'info']
describe('check State module methods', function () {
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      const state = require('../../lib/state')
      expect(typeof state[method]).toBe('function')
    })
  })
})
describe('check set/get/info for State module', function () {
  // Check set/get
  const state = require('../../lib/state')
  let value = 'string'
  const key = 'super_string'

  state.set(key, value)
  expect(state.get(key)).toBe(value)
  // Test immutability of object
  value = 'mutate'
  expect(state.get(key)).not.toBe(value)

  // Test immutability of complex object
  const valueObject = {
    element: 'test1',
    element2: 'test2'
  }
  const keyObject = 'super_object'
  state.set(keyObject, valueObject)
  valueObject.element = 'should_fail'
  expect(state.get(keyObject).element).not.toBe(valueObject.element)

  // Check info method
  const data = state.info()
  expect(data[keyObject].element2).toBe(valueObject.element2)
})
