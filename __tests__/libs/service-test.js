require('../_base');
var methods = ['add', 'get', 'clear'];
describe('check Events module methods', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      var events = require('../../lib/services');
      expect(events[method]).toBeDefined();
    });
  });
});
