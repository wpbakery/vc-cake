var VcCake = require('vc-cake');
VcCake.addModule('navbar', function(app){
  var NavBar = {
      render: function() {
        console.log('navbar created');
        app.publish('render', true);
      }
  };
  return {
    init: function() {
      NavBar.render();
    }
  };
});
