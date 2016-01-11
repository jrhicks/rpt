#! /usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var generateHelper = require('./generateHelper');

console.log('React Project Tools');
console.log('  rpt (c) 2016 @jrhicks - MIT LICENSE');
console.log('  conflicter et al (c) Google - BSD LICENSE');

function generate(generatorCommand, name, args, options) {
  var searchProjectGenerators = true;
  generateHelper(generatorCommand, name, args, options, searchProjectGenerators);
}

function createNew(name) {
  var generatorCommand = '_new';
  var args = {};
  var options = [];
  var searchProjectGenerators = false;
  generateHelper(generatorCommand, name, args, options, searchProjectGenerators);
}

program.version(pkg.version).command('g [generator:command] [name] [args...]').description('Generate code for a data type using specified generator and command.').option('-f, --force', 'Overwrite files without prompting.').action(generate);

program.version(pkg.version).command('new [App]').description('Create a new react App').action(createNew);

program.parse(process.argv);