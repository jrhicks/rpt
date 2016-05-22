#! /usr/bin/env node

require("babel-polyfill");
import program from 'commander';
import pkg from '../package.json';
import generateHelper from './generateHelper';
import register from 'babel-core/register';
import fs from 'fs';

// require code not in node_modules with babel stage=0
register({
  presets: ['es2015', 'stage-0'],
  ignore: false,
  only: [/generators/, /models/, /clients/, /oims/],
});

console.log('React Project Tools');
console.log('  rpt (c) 2016 @jrhicks - MIT LICENSE');
console.log('  conflicter et al (c) Google - BSD LICENSE');

function generate(generatorCommand, name, args, options) {
  const searchProjectGenerators = true;
  return generateHelper(generatorCommand, name, args, options, searchProjectGenerators);
}

function createNew(name) {
  const generatorCommand = '_new';
  const args = {};
  const options = [];
  const searchProjectGenerators = false;
  return generateHelper(generatorCommand, name, args, options, searchProjectGenerators);
}

function wiki(file) {
  const originalContents = fs.readFileSync(file).toString();
  let contents = fs.readFileSync(file).toString();
  const reg = RegExp(/\[\[(.*?)\]\]/);
  let result;
  result = reg.exec(contents);
  while (result) {
    const markup = result[0];
    const command = result[1];
    const [generatorCommand, name, ...args] = command.split(' ');
    const searchProjectGenerators = true;
    const options = {};
    const gObj = generateHelper(generatorCommand, name, args, options, searchProjectGenerators);
    const componentName = gObj.componentName();
    const componentCode = `<${componentName} />`;
    const importStatement = `import ${componentName} from './${componentName}.jsx';`;
    contents = importStatement + '\n' + contents;
    contents = contents.replace(markup, componentCode);
    result = reg.exec(contents);
  }
  if (originalContents !== contents) {
    fs.writeFileSync(file, contents);
  }
}

program
  .version(pkg.version)
  .command('g [generator:command] [name] [args...]')
  .description('Generate code for a data type using specified generator and command.')
  .option('-f, --force', 'Overwrite files without prompting.')
  .action(generate);

program
  .version(pkg.version)
  .command('new [App]')
  .description('Create a new react App')
  .action(createNew);

program
  .version(pkg.version)
  .command('w [file]')
  .description('Execute experimental WikiComponents')
  .action(wiki);

program.parse(process.argv);
