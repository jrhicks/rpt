const path = require('path');

class RouteGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const gen = this.gen;
    const cwd = process.cwd();
    const routeFolderName = `_${this.camelizeName()}`;
    gen.template('index.js.ejs',
      path.join(cwd, routeFolderName, 'index.js'));
    gen.template('Component.jsx.ejs',
      path.join(cwd, routeFolderName, `${this.camelizeName()}.jsx`));
    gen.template('Component.scss.ejs',
      path.join(cwd, routeFolderName, `${this.camelizeName()}.scss`));
    gen.replace('childRoutes: [',
                `childRoutes: [\n    require('./_${this.camelizeName()}'),`,
                path.join(cwd, 'index.js'));
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

  pluralDasherizeName() {
    return this.gen.inflect.dasherize(this.pluralizeName());
  }

  dasherizeName() {
    return this.gen.inflect.dasherize(this.name);
  }

  camelizeName() {
    return this.gen.inflect.camelize(this.name);
  }
}

module.exports = RouteGenerator;
