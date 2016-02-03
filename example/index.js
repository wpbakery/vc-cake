var VcCake = require('vc-cake');

// var app = new VcCake();
/*var app = new VcCake();

app.addService('utils', function(){
  return require('./services/Utils');
}).start(function(){

});*/

var main = new VcCake('test');
var m = {
  a: function() {
    console.log(a);
  },
  b: function() {
    console.log(b);
  },
};
var app = VcCake.app('test');
var newM = app.install(m);
console.log(newM.a());
main.start();

/*var nModule = main.install('test', {
  a: function() {
    console.log('a');
  },
  b: function() {
    console.log('b');
  }
});
console.log(nModule);*/
/*VcCake
  .addService('utils', function(){
    return require('./services/Utils');
  }).app()
  .init(function(){
    require('./modules/navbar');
    require('./modules/editor');
    // Add actions
    require('./actions/editor');
    require('./actions/user');
  }).start();*/
