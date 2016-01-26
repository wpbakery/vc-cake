var VcCake = require('vc-cake');

VcCake
  .addService('utils', function(){
    return require('./services/Utils');
  }).app()
  .init(function(){
    require('./modules/navbar');
    require('./modules/user');
    // Add actions
    require('./actions/editor');
    require('./actions/user');
  }).start();
