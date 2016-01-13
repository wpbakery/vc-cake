var VcCake = require('vc-cake');
var path = require('path');

VcCake
  .require(path.join(__dirname, 'modules/User'))
  .addService('utils', path.join(__dirname, 'services/Utils'))
  .init();
