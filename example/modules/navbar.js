var vcCake = require('vc-cake');
vcCake.addModule('navbar', function(app){
  var NavBar = {
      render: function() {
        console.log('render');
      }
  };
  return function() {
      Navbar.render();
  };
});
