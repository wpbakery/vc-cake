jest.dontMock('../index');

describe('running', function() {
  it('create new app and start it. Check does it have a correct state', function() {
    var vcCake = require('../index');
    vcCake.start(function() {
      // test
    });
    expect(vcCake.state()).toBe('running');
  });
});

describe('stopped', function() {
  it('create new app add service. Check does it has a correct state', function() {
    var vcCake = require('../index');
    vcCake.addService('test', {test: true});
    expect(vcCake.state()).toBe('stopped');
  });
});