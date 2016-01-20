const fs = require('fs');
const path = require('path');
const GenCore = require('./core');
const findRoot = require('find-root');

function generateHelper(generatorCommand, name, args, options, searchProjectGenerators) {
  // Setup GeneratorCore
  const [generator, cmd] = generatorCommand.split(':');
  const command = `${cmd}`.toLowerCase();

  // Determine what generator to run
  let generatorPath = null;

  if (options) {
    // TODO
  }

  if (generatorCommand === null) {
    console.log('  Generator not specified.  Exiting');
    process.exit(0);
  }

  console.log(`\nSearching for generator '${generator}'.`);
  const builtInGenerator = path.resolve(__dirname, '..', 'generators', generator);
  if (fs.existsSync(builtInGenerator)) {
    console.log(`  Found built-in generator.`);
    generatorPath = builtInGenerator;
  } else {
    console.log(`  Did not find built-in.`);
  }

  if (searchProjectGenerators) {
    const root = findRoot(process.cwd());
    const projectGenerator = path.resolve(root, 'generators', generator);
    if (fs.existsSync(projectGenerator)) {
      if (builtInGenerator !== null) {
        console.log(`  Found in project.`);
        console.log(`  Using project's.`);
      }

      generatorPath = projectGenerator;
    } else {
      console.log(`  Did not find in project.`);
      if (builtInGenerator !== null) {
        console.log(`  Using built-in.`);
      } else {
        console.log(`  No generator found.  Exiting!`);
        process.exit(1);
      }
    }
  }

  const templatePath = path.resolve(generatorPath, 'templates');
  const shouldForce = false;
  const gen = new GenCore({ templatePath, shouldForce });

  // Require Project Generator And Run Using Core
  const generatorScriptPath = path.join(generatorPath, 'index.js');
  const ImportedGenerator = require(generatorScriptPath);
  const gObj = new ImportedGenerator({ gen, command, name, args });
  gen.makeReady(gObj);
  gObj.run();
  gen.finish();
}


module.exports = generateHelper;
