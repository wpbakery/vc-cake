/* global describe, it, expect */

require('../_full_api_test')
const vcCake = require('../../index')

describe('App Data', function () {
  const methods = ['getData', 'setData', 'getDataAll']
  methods.forEach(function (method) {
    it('checks method "' + method + '" exists', function () {
      expect(typeof vcCake[method]).toBe('function')
    })
  })
})

describe('App Data manage', function () {
  let value = 'string_'
  const key = 'super_string_'

  vcCake.setData(key, value)
  expect(vcCake.getData(key)).toBe(value)
  // Test immutability of object
  value = 'mutate_'
  expect(vcCake.getData(key)).not.toBe(value)

  // Test complex object
  const valueObject = {
    element: 'test1_',
    element2: 'test2_'
  }
  const keyObject = 'super_object_'
  vcCake.setData(keyObject, valueObject)
  expect(vcCake.getData(keyObject).element).toBe(valueObject.element)

  // Test array object
  const valueObjectArray = ['test1_2', 'test2_2']
  const keyObjectArray = 'super_object_2'
  vcCake.setData(keyObjectArray, valueObjectArray)
  expect(vcCake.getData(keyObjectArray)[1]).toBe(valueObjectArray[1])

  // Check info method
  const data = vcCake.getDataAll()
  expect(data[keyObject].element2).toBe(valueObject.element2)
})
