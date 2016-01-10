import path from 'path';

class GeneratorGenerator {

  constructor({gen, command, name, args}) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    let gen = this.gen;

    // Compute Destination Directory Relative To App Root
    let generatorDir = gen.config.generatorDirectory;
    let genName = this.dasherizeName();
    let destDir = path.join(generatorDir, genName);

    switch (this.command) {
     default:
      gen.template('index.js.ejs', path.join(destDir, 'index.js'));
      gen.template('template.js.ejs', path.join(destDir, 'templates', 'template.js.ejs'));
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

module.exports = GeneratorGenerator;
