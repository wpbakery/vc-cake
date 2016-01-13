let modules = [];
module.exports = {
  exception: function (message) {
    this.message = message;
    this.name = "ServiceException";
  },
  load: function () {
    modules = modules.map((module) => {
      return require(module.path);
    });
  },
  set: function (path) {
    modules.push({
      path: path
    });
  }
};
