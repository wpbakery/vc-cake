require('../_base');
var methods = ['do', 'on', 'once'];

describe('check Module public API module', function() {
  methods.forEach(function(method) {
    it('checks method "' + method + '" exists', function() {
      var Module = require('../../api/module-public-constructor');
      var api = new Module();
      expect(api[method]).toBeDefined();
    });
  });
  it('check do via on how it works', function(){
  		var Module = require('../../api/module-public-constructor');
  		var api = new Module('test');
  		api.on('test-event');
  		expect(api.currentEvent).toBeDefined();
  });
});