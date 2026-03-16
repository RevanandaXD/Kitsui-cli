module.exports = {
  get hello() {
    return require("./core/hello");
  },
  get ignore() {
    return require("./core/ignore");
  },
  get init() {
    return require("./core/init");
  },

  get backend() {
    return require("./generators/backend");
  },
  get frontend() {
    return require("./generators/frontend");
  },

  get deploy() {
    return require("./tools/dev/deploy");
  },
  get git() {
    return require("./tools/dev/git");
  },
  get json() {
    return require("./tools/dev/json");
  },
  get live() {
    return require("./tools/dev/live");
  },
  get serve() {
    return require("./tools/dev/serve");
  },
  get test() {
    return require("./tools/dev/test");
  },
  get speedTest() {
    return require("./tools/network/speed");
  },
  get webperf() {
    return require("./tools/network/webperf");
  },
  get time() {
    return require("./tools/support/time");
  },
  get tunnel() {
    return require("./tools/dev/tunnel");
  },
  get clean() {
    return require("./tools/dev/clean");
  },
  get doctor() {
    return require("./tools/dev/doctor");
  },
  get docker() {
    return require("./tools/dev/docker");
  },
  get todo() {
    return require("./tools/support/todo");
  },
  get traffic() {
    return require("./tools/dev/traffic")
  }
};
