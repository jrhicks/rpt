const path = require('path');

class FluxGenerator {

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
      case 'component':
        gen.template('component.jsx.ejs',
          path.join(process.cwd(), `${this.componentName()}.js`));
        break;
      case 'action':
        gen.template('action.js.ejs',
          path.join(root, 'app', 'actions', `${this.camelizeName()}Actions.js`));
        gen.append(`export ${this.camelizeName()}Actions from './${this.camelizeName()}Actions';`,
           path.join(root, 'app', 'actions', 'index.js'));
        break;
      case 'store':
        gen.template('store.js.ejs',
           path.join(root, 'app', 'stores', `${this.camelizeName()}Store.js`));
        gen.append(`export ${this.camelizeName()}Store from './${this.camelizeName()}Store';`,
           path.join(root, 'app', 'stores', 'index.js'));
        break;
      case '':
        gen.template('index.js',
          path.join(root, 'app', 'stores'));
        gen.template('index.js',
          path.join(root, 'app', 'actions'));
        gen.template('AppDispatcher.js',
          path.join(root, 'app', 'AppDispatcher.js'));
        break;
      default:
        console.log(`Command '${this.command}' not recognized.`);
        break;
    }
  }

  inspect(v) {
    return JSON.stringify(v);
  }

  componentName() {
    return `${this.gen.inflect.camelize(this.name)}${this.gen.inflect.camelize(this.args[0])}`;
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

module.exports = FluxGenerator;
