var vcCake = require('../index.js');

var User = vcCake.installTo({

});

User.subscribe('init', function(){
  var Utils = vcCake.getService('utils')
  console.log(Utils.returnString());
});
