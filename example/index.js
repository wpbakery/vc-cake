var VcCake = require('vc-cake');

VcCake
  .addService('utils', function(context){
    return require('./services/Utils');
  })
  .app()
  .init(function(){
    // Add modules
    require('modules/navbar');
    // Add behavior
  }).start();
