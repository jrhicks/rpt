'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var fs = require('fs');
var path = require('path');
var GenCore = require('./core');
var findRoot = require('find-root');

function generateHelper(generatorCommand, name, args, options, searchProjectGenerators) {
  // Setup GeneratorCore

  var _generatorCommand$spl = generatorCommand.split(':');

  var _generatorCommand$spl2 = _slicedToArray(_generatorCommand$spl, 2);

  var generator = _generatorCommand$spl2[0];
  var cmd = _generatorCommand$spl2[1];

  var command = ('' + cmd).toLowerCase();

  // Determine what generator to run
  var generatorPath = null;

  if (options) {
    // TODO
  }

  if (generatorCommand === null || generatorCommand === '' || generatorCommand === undefined) {
    console.log('  Generator not specified.  Exiting');
    process.exit(0);
  }

  console.log('\nSearching for generator \'' + generator + '\'.');
  var builtInGenerator = path.resolve(__dirname, '..', 'generators', generator);
  if (fs.existsSync(builtInGenerator)) {
    console.log('  Found built-in generator.');
    generatorPath = builtInGenerator;
  } else {
    console.log('  Did not find built-in.');
  }

  if (searchProjectGenerators) {
    var root = findRoot(process.cwd());
    var projectGenerator = path.resolve(root, 'generators', generator);
    if (fs.existsSync(projectGenerator)) {
      if (builtInGenerator !== null) {
        console.log('  Found in project.');
        console.log('  Using project\'s.');
      }

      generatorPath = projectGenerator;
    } else {
      console.log('  Did not find in project.');
      if (builtInGenerator !== null) {
        console.log('  Using built-in.');
      } else {
        console.log('  No generator found.  Exiting!');
        process.exit(1);
      }
    }
  }

  var templatePath = path.resolve(generatorPath, 'templates');
  var shouldForce = false;
  var gen = new GenCore({ templatePath: templatePath, shouldForce: shouldForce });

  // Require Project Generator And Run Using Core
  var generatorScriptPath = path.join(generatorPath, 'index.js');
  var ImportedGenerator = require(generatorScriptPath);
  var gObj = new ImportedGenerator({ gen: gen, command: command, name: name, args: args });
  gen.makeReady(gObj);
  gObj.run();
  gen.finish();
  return gObj;
}

module.exports = generateHelper;