const path = require('path');

class AltGenerator {

  constructor({ gen, command, name, args }) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    const gen = this.gen;
    const root = this.gen.findRoot();

    switch (this.command) {
      case 'action':
        gen.template('action.js.ejs',
          path.join(root, 'app', 'actions', `${this.camelizeName()}Actions.js`));
        break;
      case 'store':
        gen.template('store.js.ejs',
          path.join(root, 'app', 'stores', `${this.camelizeName()}Store.js`));
        break;
      default:
        gen.template('index.js',
          path.join(root, 'app', 'stores'));
        gen.template('index.js',
          path.join(root, 'app', 'actions'));
        gen.template('alt.js.ejs',
          path.join(root, 'app', 'alt.js'));
    }
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

  lowerCamelizeName() {
    return this.gen.inflect.camelize(this.name, false);
  }

}

module.exports = AltGenerator;
