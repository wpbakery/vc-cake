var vcCake = require('vc-cake');
vcCake.addModule('navbar', function(app){
  var NavBar = {
      render: function() {
        app.publish('render');
      }
  };
  return {
    init: function() {
      NavBar,render();
    }
  };
});
