'user strict';

const path = require('path');

class NewGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const cwd = process.cwd();

    this.gen.dir('base', path.join(cwd, this.name));

    this.gen.file('.eslintignore',
                  path.join(cwd, this.name, '.eslintignore'));

    this.gen.file('.babelrc',
                  path.join(cwd, this.name, '.babelrc'));

    this.gen.file('.eslintrc',
                  path.join(cwd, this.name, '.eslintrc'));

    this.gen.template('Dashboard.jsx.ejs',
                  path.join(cwd, this.name, 'app', 'routes', 'Dashboard', 'components', 'Dashboard.jsx'));
  }

  titleizeName() {
    return this.gen.inflect.titleize(this.name);
  }
}

module.exports = NewGenerator;
