var VcCake = require('vc-cake');
VcCake.addModule('editor', function(app){
  var Editor = {
    create: function() {
      console.log('editor created');
      app.publish('create', true);
    }
  }
  return {
    init: function() {
      Editor.create();
    }
  };
});