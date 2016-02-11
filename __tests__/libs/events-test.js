require('../_base');
var methods = ['publish', 'subscribe', 'request', 'reply'];
describe('check Events module methods', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      var events = require('../../lib/events');
      expect(events[method]).toBeDefined();
    });
  });
});

