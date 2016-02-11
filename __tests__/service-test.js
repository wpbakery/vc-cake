jest.dontMock('../index');

describe('add service', function() {
  it('creates new app and add service. Check does it exists', function() {
    var vcCake = require('../index');
    var testString = 'hello' + ' ' + 'world';
    vcCake.addService('test', {
      test: function() {
        return testString;
      }
    });
  });
});
