var vcCake = require('../../index');

module.exports = function(tests) {
  Object.keys(tests).forEach(function(i) {
    tests[i].callback(vcCake);
  });
  vcCake.start().end(function() {
    Object.keys(tests).forEach(function(i) {
      var action = tests[i];
      it(action.comment, function() {
          expect(action.value).toBe(action.toBe);
        });
    });
  });
};
