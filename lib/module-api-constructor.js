const curry = require('lodash').curry

const scopes = require('./scopes')
const events = require('./events')
const services = require('./services')
const constants = require('../config/settings').constants
const enVars = require('../config/settings').env
const ModulePublicAPI = require('./module-public-api-constructor')
/**
 * @constructor
 * @type {API}
 */
const API = module.exports = function (name) {
  this.name = name
  if (typeof scopes.actions[this.name] === 'undefined') {
    scopes.actions[this.name] = {}
  }
  this.actions = scopes.actions[this.name]
}
API.prototype.addAction = function (name, fn) {
  this.actions[name] = fn
  return this
}
API.prototype.getService = function (name) {
  return services.get(name)
}
API.prototype.addService = function (name, obj) {
  services.add(name, obj)
  return this
}
API.prototype.request = function (event) {
  const data = Array.prototype.slice.call(arguments, 1)
  if (enVars.get('started') === true) {
    events.request(event, data)
  } else {
    events.reply(constants.START_EVENT, curry(function (event, data, start) {
      if (start === true) {
        events.request(event, data)
      }
    })(event, data))
  }
  return this
}
API.prototype.reply = function (event, fn) {
  events.reply(event, fn)
  return this
}
API.prototype.forget = function (event, fn) {
  events.forget(event, fn)
  return this
}
API.prototype.notify = function (event) {
  const data = Array.prototype.slice.call(arguments, 1)
  if (enVars.get('started') === true) {
    events.publish(constants.MODULE_TYPE, this.name, event, data)
  } else {
    events.reply(constants.START_EVENT, curry(function (module, name, event, data, start) {
      if (start === true) {
        events.publish(module, name, event, data)
      }
    })(constants.MODULE_TYPE, this.name, event, data))
  }
  return this
}
API.prototype.on = ModulePublicAPI.prototype.on
API.prototype.once = function (event, data) {
  return this.on(event, data, { once: true })
}
API.prototype.off = ModulePublicAPI.prototype.off
API.prototype.offOnce = function (event, data) {
  return this.off(event, data, { once: true })
}
API.prototype.module = function (scope) {
  return new ModulePublicAPI(scope)
}
API.prototype.destructor = function (fn) {
  scopes.destructor(this.name, fn)
  return this
}
