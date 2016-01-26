var VcCake = require('vc-cake');
VcCake.addAction('user', function(app){
  var Navbar = app.getModule('navbar');
  Navbar.on('render', function(){
    console.log('user rendered too: ' + app.getService('utils').returnString());
  });
}, ['navbar']);