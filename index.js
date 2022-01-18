// Inner modules
const enVars = require('./config/settings').env
const constants = require('./config/settings').constants
const services = require('./lib/services')
const events = require('./lib/events')
const scopes = require('./lib/scopes')
const state = require('./lib/state')
const storages = require('./lib/storages')
const ModuleAPI = require('./lib/module-api-constructor')
const CakeException = require('./lib/exception')
/**
 * @constructor
 */
const App = function () {
}

App.prototype.add = function (scope, fn) {
  scopes.add(scope, fn, new ModuleAPI(scope))
  if (enVars.get('started')) {
    scopes.load()
  }
  return this
}
App.prototype.getService = function (name) {
  return services.get(name)
}
App.prototype.addService = function (name, obj) {
  services.add(name, obj)
  return this
}
App.prototype.env = function (key, value) {
  let returnValue = this
  if (key && typeof value !== 'undefined') {
    if (constants.START_EVENT === key) {
      new CakeException().throw('Error! You can\'t set %s var. This let can be set only by app\'s start method', key)
    } else {
      enVars.set(key, value)
    }
  } else if (key) {
    returnValue = enVars.get(key)
  }
  return returnValue
}
App.prototype.start = function (fn) {
  try {
    if (enVars.get('started') === false) {
      if (typeof fn === 'function') {
        fn()
      }
      scopes.load()
      enVars.set('started', true)
      events.publish('app', 'event', constants.START_EVENT, true, {})
    } else {
      if (typeof fn === 'function') {
        fn()
      }
    }
  } catch (e) {
    if (enVars.get('debug')) {
      throw e
    }
  }
  return this
}
App.prototype.end = function (fn) {
  if (enVars.get('started') === true) {
    if (typeof fn === 'function') {
      fn()
    }
    scopes.clear()
    services.clear()
    enVars.set('started', false)
    events.publish('app', 'event', 'end', true, {})
  }
  return this
}
App.prototype.state = function () {
  return enVars.get('started') ? 'running' : 'stopped'
}
App.prototype.remove = function (name) {
  scopes.remove(name)
}
App.prototype.getData = function (key) {
  return state.get(key)
}
App.prototype.setData = function (key, value) {
  state.set(key, value)
  return this
}
App.prototype.onDataChange = function (key, fn, options) {
  state.onChange(key, fn, options)
}
App.prototype.ignoreDataChange = function (key, fn, options) {
  state.ignoreChange(key, fn, options)
}
App.prototype.getDataAll = function () {
  return state.info()
}
App.prototype.getStorage = function (name) {
  return storages.get(name)
}
App.prototype.addStorage = function (name, fn) {
  return storages.add(name, fn)
}
module.exports = new App()
