import path from 'path';

class CollectionGenerator {

  constructor({ gen, command, name, args }) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    const gen = this.gen;
    const root = this.gen.findRoot();
    const name = this.gen.inflect.camelize(this.name, false);

    gen.replace(/ *const db *= *{/, `
let ${name} = loki.getCollection('${name}');
if (${name} === null) {
  ${name} = loki.addCollection('${name}', { indices: ['id'] });
}

const db = {
  ${name}: loki.getCollection('${name}'),
`,
              path.join(root, 'app', 'db.js'));
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

module.exports = CollectionGenerator;
