var VcCake = require('vc-cake');
VcCake.addAction('editor', function(app){
  var NavBar = app.getModule('navbar');
  app.getModule('editor').on('create', function(){
    NavBar.init();
  })
}, ['navbar', 'editor']);