const defaults = require('lodash').defaults

const ProxyEvent = module.exports = function (options) {
  if (typeof options.name === 'undefined') {
    throw new TypeError('Proxy event object must have name!')
  }
  this.options = defaults(options, { once: false })
}
ProxyEvent.prototype.set = function (key, value) {
  this.options[key] = value
}
ProxyEvent.prototype.get = function (key) {
  return this.options[key]
}
ProxyEvent.prototype.getName = function () {
  return this.get('name')
}
ProxyEvent.prototype.callOnce = function () {
  return this.get('once')
}
