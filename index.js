var route = process.argv[2];

function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

if(route!='views')
{
  var dir = path.resolve('.','routes');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  var dir = path.resolve('.','routes', route);
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  var dir = path.resolve('.','routes', route, 'components');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  // ./routes/Xyz/components/Xyz.jsx
  var source = path.resolve(__dirname, 'templates','Component.js');
  var template = fs.readFileSync(source, 'utf8');
  var code = replaceAll(template, '$1', route);
  var dest = path.resolve('.','routes', route, 'components', route+'.jsx');
  fs.writeFile(dest, code, function(err) {
      if(err) {
          console.log("Failed to write component.")
          return console.log(err);
      }
  });

  // ./routes/Xyz/index.js
  var source = path.resolve(__dirname, 'templates','index.js');
  var template = fs.readFileSync(source, 'utf8');
  var code = replaceAll(template, '$1', route);
  var dest = path.resolve('.','routes', route, 'index.js');
  fs.writeFileSync(dest, code);

  // ./index.js
  var source = path.resolve('.', 'index.js');
  var dest = path.resolve('.', 'index.js');
  if (fs.existsSync(source)){
    template = fs.readFileSync(source, 'utf8');
    code = template.replace("childRoutes: [", "childRoutes: [\n     require('./"+route+"'),");
    fs.writeFileSync(dest, code);
  }
}

if(route=='views')
{
  var dir = path.resolve('.','views');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  var dir = path.resolve('.', 'views', 'components');
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  // ./routes/Xyz/components/Xyz.jsx
  var source = path.resolve(__dirname, 'templates','Component.js');
  var template = fs.readFileSync(source, 'utf8');
  var code = replaceAll(template, '$1', 'App');
  var dest = path.resolve('.','views', 'components', 'App.jsx');
  fs.writeFile(dest, code, function(err) {
      if(err) {
          console.log("Failed to write component.")
          return console.log(err);
      }
  });

  // ./routes/Xyz/index.js
  var source = path.resolve(__dirname, 'templates','index.js');
  var template = fs.readFileSync(source, 'utf8');
  var code = replaceAll(template, '$1', 'App');
  var dest = path.resolve('.','views', 'index.js');
  fs.writeFileSync(dest, code);

  // ./routes/Xyz/index.js
  var source = path.resolve(__dirname, 'templates','Main.jsx');
  var template = fs.readFileSync(source, 'utf8');
  var code = replaceAll(template, '$1', route);
  var dest = path.resolve('.','Main.jsx');
  fs.writeFileSync(dest, code);
}
