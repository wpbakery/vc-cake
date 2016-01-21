var VcCake = require('vc-cake');
var path = require('path');

VcCake
  .addService('utils', path.join(__dirname, 'services/Utils'))
  .init(function(){
    // Add modules
    require('modules/User');
    // Add behavior
  });
