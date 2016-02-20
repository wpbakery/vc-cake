require('../_full_api_test');
var testEvents = require('../test-libs/test-events');
describe('running scope api check creating actions and using do/on chain', function() {
  testEvents([
        {
          comment: 'create 2 modules with same scope and check access',
          value: false,
          toBe: true,
          callback: function(vcCake) {
            var settings = this;
            vcCake.add('test-action', function(api) {
              api.addAction('testAction', function(toBe) {
                settings.value = toBe;
              });
            });
            vcCake.add('test-action', function(api) {
              api.actions.testAction(settings.toBe);
            });
          }
        },
        {
          comment: 'create action and check in another scope action list',
          value: null,
          toBe: ['testActionX', 'testActionY'],
          expect: 'toEqual',
          callback: function(vcCake) {
            var settings = this;
            vcCake.add('test-action-list', function(api) {
              settings.toBe.forEach(function(action) {
                api.addAction(action, function() {
                // here comes action
              });
              }, this);
            });
            vcCake.add('test-action-list-2', function(api) {
              settings.value = api.module('test-action-list').actions;
            });
          }
        },
        {
          comment: 'create 2 modules call do for action from another scipe',
          value: false,
          toBe: 'yes-it-is-test',
          callback: function(vcCake) {
            var settings = this;
            vcCake.add('test-action-2', function(api) {
              api.addAction('testAction2', function(toBe) {
                settings.value = toBe;
              });
              api.notify('call-test-on');
            });
            vcCake.add('test-action-3', function(api) {
              api.module('test-action-2').on('call-test-on').do('testAction2', settings.toBe);
            });
          }
        }
      ]);
});
