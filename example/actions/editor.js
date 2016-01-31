var VcCake = require('vc-cake');
VcCake.addAction('editor', function(app){
  var NavBar = app.getModule('navbar');
  app.getModule('editor').on('create', function(){
    NavBar.invoke('init');
  });
  app.getModule('editor').invoke('init');
}, ['navbar', 'editor']);