import path from 'path';

class GeneratorGenerator {

  constructor({ gen, name }) {
    this.gen = gen;
    this.name = name;
  }

  run() {
    const gen = this.gen;
    const cwd = process.cwd();

    const paths = [
                    ['.babelrc'],
                    ['.eslintignore'],
                    ['.eslintrc'],
                    ['package.json'],
                    ['webpack.config.js'],
                    ['src', 'index.html'],
                    ['src', 'Main.jsx'],
                    ['src', 'views', 'index.js'],
                    ['src', 'views', 'components', 'App.jsx']];

    switch (this.command) {
      default:
        for (const p of paths) {
          this.gen.file(path.join('./', ...p), path.join(cwd, this.name, ...p));
        }
    }
  }
}

module.exports = GeneratorGenerator;
