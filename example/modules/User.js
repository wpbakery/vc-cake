var vcCake = require('vc-cake');

var User = vcCake.installTo({

});

User.subscribe('init', function(){
  var Utils = vcCake.getService('utils')
  console.log(Utils.returnString());
});
