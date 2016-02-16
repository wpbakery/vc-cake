require('../_full_api_test');
var methods = ['do', 'on', 'once'];

describe('check Module public API module', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      var Module = require('../../lib/module-public-api-constructor');
      var api = new Module();
      expect(api[method]).toBeDefined();
    });
  });
  it('check do via on how it works', function(){
  		var Module = require('../../lib/module-public-api-constructor');
  		var api = new Module('test');
  		expect(api.on('test-event')).toBeDefined();
  });
});