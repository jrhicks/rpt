const path = require('path');

class LokiGenerator {

  constructor({ gen, command, name, args }) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    const gen = this.gen;
    const root = this.gen.findRoot();

    gen.file('db.js',
             path.join(root, 'app', 'db.js'));
    gen.replace(/ *module:/,
`  // Prevent webpack from trying to bundle 'fs' from lokijs
  node: {
    fs: "empty"
  },

  module:`,
              path.join(root, 'webpack.config.js'));
  }

  inspect(v) {
    return JSON.stringify(v);
  }

  pluralizeName() {
    return this.gen.inflect.pluralize(this.name);
  }

  titleizeName() {
    return this.gen.inflect.titleize(this.name);
  }

  dasherizeName() {
    return this.gen.inflect.dasherize(this.name);
  }

  camelizeName() {
    return this.gen.inflect.camelize(this.name);
  }

}

module.exports = LokiGenerator;
