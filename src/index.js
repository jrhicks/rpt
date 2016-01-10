#! /usr/bin/env node

var babel = require('babel-core');
var program = require('commander');
var chalk = require('chalk');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var fse = require('fs-extra');
var generateCore = require('./core');
var pkg = require('../package.json');
var register = require("babel-core/register");
var findRoot = require("find-root");


// require code not in node_modules with babel stage=0
register({
  "presets": ["es2015", "stage-0"],
});

program
  .version(pkg.version)
  .command('g [generator:command] [name] [args...]')
  .description('Generate code for a data type using specified generator and command.')
  .option("-f, --force", "Overwrite files without prompting.")
  .action(generate);

program
  .version(pkg.version)
  .command('postinstall')
  .description('Install and init generators for types and generators.')
  .action(postinstall);

function postinstall() {
  var cwd = process.cwd();
  fse.ensureDirSync(path.join(cwd, 'generators'));
  fse.copySync(path.join(__dirname, '..', 'generators'),
               path.join(cwd, 'generators'))
}

function generate(generatorCommand, name, args, options) {
  console.log("React Project Tools");
  console.log('rpt (c) 2016 @jrhicks - MIT LICENSE');
  console.log('conflicter et al (c) Google - BSD LICENSE');

  if(generatorCommand==null) {
    console.log("Generator not specified.  Exiting");
    process.exit(0);
  }

  // Setup GeneratorCore
  var [generator, command] = generatorCommand.split(':');

  // Determine what generator to run
  var generatorPath = null;

  var root = findRoot(process.cwd);
  var builtInGenerator = path.resolve(__dirname, 'generators',generator);
  if (!fs.existsSync(builtInGenerator)){
    console.log(`Found built-in generator ${generator}.`);
    generatorPath = builtInGenerator;
  } else {
    console.log(`Did not find built-in generator ${generator}.`)
  }

  var projectGenerator = path.resolve(root, 'generators',generator);
  if (!fs.existsSync(projectGenerator)){
    if(builtInGenerator != null) {
      console.log(`Found project generator ${generator}.`)

    } else {
      console.log(`Found project generator ${generator}.`);
      console.log(`Using project's.`);
    }
    generatorPath = projectGenerator;
  } else {
    console.log(`Did not find project generator ${generator}`)
    if(builtInGenerator != null) {
      console.log(`Using built-in.`)
    } else {
      console.log(`Exiting!`);
      process.exit(1);
    }
  }

  var templatePath = path.resolve(generatorPath, 'templates');
  var shouldForce = false;
  var gen = new generateCore({templatePath, shouldForce});

  // Require Project Generator And Run Using Core
  var generatorScriptPath = path.join(generatorPath, 'index.js');
  var importedGenerator = require(generatorScriptPath);
  var gObj = new importedGenerator({gen, command, name, args});
  gen.makeReady(gObj);
  gObj.run();
  gen.finish();
}

program.parse(process.argv);
