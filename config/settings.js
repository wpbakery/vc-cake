var settings = {
  debug: !!process.env.DEBUG,
  start: false
};
exports.env = {
  get: function(key) {
    return settings[key];
  },
  set: function(key, value) {
    settings[key] = value;
  }
};
exports.constants = {
  MODULE_TYPE: 'module'
};