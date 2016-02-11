require('./_base');

describe('running', function() {
  it('creates new app and start it. Check does it have a correct state', function() {
    var vcCake = require('../index');
    vcCake.start(function() {
      // test
    });
    expect(vcCake.state()).toBe('running');
  });
});