jest.dontMock('../../lib/mediator');
jest.dontMock('../../lib/events');
var methods = ['publish', 'subscribe', 'request', 'reply'];
describe('check Events module methods', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function(method) {
      var events = require('../../lib/events');
      expect(events[method]).toBeDefined();
    });
  });
});

