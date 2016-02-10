var VcCake = require('vc-cake');
VcCake.addModule('editor', function(api){
  var Editor = {
    create: function() {
      console.log('editor created');
      api.notify('create');
    }
  }
  return {
    init: function() {
      Editor.create();
    }
  };
});