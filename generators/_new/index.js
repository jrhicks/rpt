import path from 'path';

class GeneratorGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const cwd = process.cwd();

    this.gen.dir('base', path.join(cwd, this.name));
    this.gen.template('Dashboard.jsx.ejs',
                  path.join(cwd, this.name, 'app', 'routes', 'Dashboard', 'Dashboard.jsx'));
  }

  titleizeName() {
    return this.gen.inflect.titleize(this.name);
  }
}

module.exports = GeneratorGenerator;
