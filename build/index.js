#! /usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _generateHelper = require('./generateHelper');

var _generateHelper2 = _interopRequireDefault(_generateHelper);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

require("babel-polyfill");

// require code not in node_modules with babel stage=0
(0, _register2.default)({
  presets: ['es2015', 'stage-0'],
  ignore: false,
  only: /generators/
});

console.log('React Project Tools');
console.log('  rpt (c) 2016 @jrhicks - MIT LICENSE');
console.log('  conflicter et al (c) Google - BSD LICENSE');

function generate(generatorCommand, name, args, options) {
  var searchProjectGenerators = true;
  return (0, _generateHelper2.default)(generatorCommand, name, args, options, searchProjectGenerators);
}

function createNew(name) {
  var generatorCommand = '_new';
  var args = {};
  var options = [];
  var searchProjectGenerators = false;
  return (0, _generateHelper2.default)(generatorCommand, name, args, options, searchProjectGenerators);
}

function wiki(file) {
  var originalContents = _fs2.default.readFileSync(file).toString();
  var contents = _fs2.default.readFileSync(file).toString();
  var reg = RegExp(/\[\[(.*?)\]\]/);
  var result = undefined;
  result = reg.exec(contents);
  while (result) {
    var markup = result[0];
    var command = result[1];

    var _command$split = command.split(' ');

    var _command$split2 = _toArray(_command$split);

    var generatorCommand = _command$split2[0];
    var name = _command$split2[1];

    var args = _command$split2.slice(2);

    var searchProjectGenerators = true;
    var options = {};
    var gObj = (0, _generateHelper2.default)(generatorCommand, name, args, options, searchProjectGenerators);
    var componentName = gObj.componentName();
    var componentCode = '<' + componentName + ' />';
    var importStatement = 'import ' + componentName + ' from \'./' + componentName + '.jsx\';';
    contents = importStatement + '\n' + contents;
    contents = contents.replace(markup, componentCode);
    result = reg.exec(contents);
  }
  if (originalContents !== contents) {
    _fs2.default.writeFileSync(file, contents);
  }
}

_commander2.default.version(_package2.default.version).command('g [generator:command] [name] [args...]').description('Generate code for a data type using specified generator and command.').option('-f, --force', 'Overwrite files without prompting.').action(generate);

_commander2.default.version(_package2.default.version).command('new [App]').description('Create a new react App').action(createNew);

_commander2.default.version(_package2.default.version).command('w [file]').description('Execute experimental WikiComponents').action(wiki);

_commander2.default.parse(process.argv);