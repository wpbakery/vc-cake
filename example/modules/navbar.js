var VcCake = require('vc-cake');
VcCake.addModule('navbar', function(app){
  var NavBar = {
      render: function() {
        app.publish('render', true);
      }
  };
  console.log('test');
  return {
    init: function() {
      NavBar.render();
    }
  };
});
