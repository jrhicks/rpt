'user strict';

const path = require('path');

class NewGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const cwd = process.cwd();

    this.gen.dir('app', path.join(cwd, this.name, 'app'));

    this.gen.template('package.json',
                  path.join(cwd, this.name, 'package.json'));

    this.gen.file('webpack.config.js',
                  path.join(cwd, this.name, 'webpack.config.js'));

    this.gen.file('.eslintignore',
                  path.join(cwd, this.name, '.eslintignore'));

    this.gen.file('.babelrc',
                  path.join(cwd, this.name, '.babelrc'));

    this.gen.file('.eslintrc',
                  path.join(cwd, this.name, '.eslintrc'));

  }

  titleizeName() {
    return this.gen.inflect.titleize(this.name);
  }
}

module.exports = NewGenerator;
