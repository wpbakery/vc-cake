jest.dontMock('../../lib/events');

['publish', 'subscribe', 'request', 'reply'].forEach(function(method){
  describe('check Events module ' + method + ' exists', function() {
    it('checks publish method exists', function() {
      var events = require('../../lib/events');
      expect(typeof events[method]).toBe('function');
    });
  });
});

