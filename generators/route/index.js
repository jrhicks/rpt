import path from 'path';
import fs from 'fs';

class RouteGenerator {

  constructor({gen, command, name, args}) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    let gen = this.gen;

    // Compute Destination Directory Relative To App Root
    let cwd = process.cwd();
    let routeFolderName = this.camelizeName();
    gen.template('index.js.ejs', path.join(cwd, 'routes', routeFolderName, 'index.js'));
    gen.template('Component.jsx.ejs', path.join(cwd, 'routes', routeFolderName, 'components', `${this.camelizeName()}.jsx`));
    gen.replace('childRoutes: [',
                `childRoutes: [\n    require('./routes/${this.camelizeName()}'),`,
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
