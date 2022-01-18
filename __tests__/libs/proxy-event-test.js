/* global describe, it, expect */

require('../_full_api_test')
describe('check Proxy event', function () {
  it('creates new proxy event and checks it name and once option', function () {
    const ProxyEvent = require('../../lib/proxy-event-constructor')
    const eventName = 'test-event'
    const testValue = 'hello'
    const proxy = new ProxyEvent({ name: eventName, once: true })
    expect(proxy.getName()).toBe(eventName)
    expect(proxy.callOnce()).toBe(true)
    proxy.set('test', testValue)
    expect(proxy.get('test')).toBe(testValue)
  })
  it('create new proxy event and delete this get console result on this', function () {
    const ProxyEvent = require('../../lib/proxy-event-constructor')
    const test = {
      p: new ProxyEvent({ name: 'test' })
    }
    expect(delete test.p).toBe(true)
  })
})
