require('../_full_api_test');
var testEvents = require('../test-libs/test-events');
describe('running scope api check request/reply', function() {
  testEvents({
        reply: {
          comment: 'create 2 modules and check reply from test to test-2 scope',
          value: false,
          toBe: true,
          callback: function(vcCake) {
            var settings = this;
            vcCake.add('test', function(api) {
              api.request('hello');
            });
            vcCake.add('test-2', function(api) {
              api.reply('hello', function() {
                settings.value = settings.toBe;
              });
            });
          }
        },
        replySame: {
          comment: 'create 1 module and call add reply before request',
          value: false,
          toBe: true,
          callback: function(vcCake) {
            var settings = this;
            vcCake.add('test-same', function(api) {
              api.reply('hello', function() {
                settings.value = settings.toBe;
              });
              api.request('hello');
            });
          }
        }
      });
  /*
// Check module notifucation from another module
    vcCake.add('test-3', function(api) {
      console.log(api);
      api.module('test').on('test-hello', function() {
        console.log('kuku v2');
      });
      // Check chainable on/do
      console.log(api.module('test').on('test-hello'));
      api.module('test').on('test-hello').do('sayMau', 'kitty');
    });

    // Check inner on from same scope
    vcCake.add('test', function(api){
      api.on('test-hello', function(){
        console.log('inner hello');
      })
    });*/
});
