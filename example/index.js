var VcCake = require('vc-cake');

VcCake
  .addService('utils', function(){
    return require('./services/Utils');
  }).app()
  .init(function(){
    require('./modules/navbar');
    // Add actions
    require('./app/user');
  }).start();
