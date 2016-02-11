jest.dontMock('../index');

describe('add service', function() {
  it('create new app and add service. Check does it exists', function() {
    var vcCake = require('../index');
    var testString = 'hello' + ' ' + 'world';
    vcCake.addService('test', {
      test: function() {
        return testString;
      }
    });
    expect(vcCake.getService('test').test()).toBe(testString);
  });
});