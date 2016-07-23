/* global describe, it, expect */

require('../_full_api_test')
describe('check Proxy event', function () {
  it('creates new proxy event and checks it name and once option', function () {
    var ProxyEvent = require('../../lib/proxy-event-constructor')
    var eventName = 'test-event'
    var testValue = 'hello'
    var proxy = new ProxyEvent({name: eventName, once: true})
    expect(proxy.getName()).toBe(eventName)
    expect(proxy.callOnce()).toBe(true)
    proxy.set('test', testValue)
    expect(proxy.get('test')).toBe(testValue)
  })
  it('create new proxy event and delete this get console result on this', function () {
    var ProxyEvent = require('../../lib/proxy-event-constructor')
    var test = {
      p: new ProxyEvent({name: 'test'})
    }
    expect(delete test.p).toBe(true)
  })
})

