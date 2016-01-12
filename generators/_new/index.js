import path from 'path';

class GeneratorGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const cwd = process.cwd();
    const paths = [
                    ['.babelrc'],
                    ['.eslintignore'],
                    ['.eslintrc'],
                    ['package.json'],
                    ['webpack.config.js'],
                    ['app', 'index.html'],
                    ['app', 'Main.jsx'],
                    ['app', 'views', 'index.js'],
                    ['app', 'views', 'App.jsx']];

    switch (this.command) {
      default:
        for (const p of paths) {
          this.gen.template(path.join('./', ...p), path.join(cwd, this.name, ...p));
        }
    }
  }

  titleizeName() {
    return this.gen.inflect.titleize(this.name);
  }
}

module.exports = GeneratorGenerator;
