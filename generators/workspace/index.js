import path from 'path';

class WorkspaceGenerator {

  constructor({ gen, command, name, args }) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    const gen = this.gen;
    const fname = `${this.camelizeName()}.jsx`;
    const projectRoot = gen.findRoot();

    switch (this.command) {
      default:
        gen.template('components/Dashboard.jsx.ejs',
                      path.join(projectRoot, 'app', 'routes', this.camelizeName(),
                                'components', fname));

        gen.template('index.js.ejs',
                      path.join(projectRoot, 'app', 'routes', this.camelizeName(),
                                'index.js'));

        gen.replace('childRoutes: [',
                    `childRoutes: [\n    require('./routes/${this.camelizeName()}'),`,
                    path.join(projectRoot, 'app', 'index.js'));
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

}

module.exports = WorkspaceGenerator;
