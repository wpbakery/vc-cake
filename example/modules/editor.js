var VcCake = require('vc-cake');
VcCake.addModule('editor', function(app){
  var Editor = {
    create: function() {
      app.publish('create', true);
    }
  }
  return {
    init: function() {
      Editor.create();
    }
  };
});