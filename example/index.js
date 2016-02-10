var VcCake = require('vc-cake');

VcCake.addService('utils', {foo: 'var'});

VcCake.start(function(){
  console.log('heelo');
});
