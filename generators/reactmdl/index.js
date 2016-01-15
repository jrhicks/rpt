import path from 'path';

class ReactmdlGenerator {

  constructor({ gen, command, name, args }) {
    this.gen = gen;
    this.command = command;
    this.name = name;
    this.args = args;
  }

  run() {
    const gen = this.gen;
    const root = this.gen.findRoot();

    switch (this.command) {
      default:
        gen.dir('MaterialDesignLite',
                path.join(root, 'app', 'components', 'MaterialDesignLite'));

        gen.dir('StandardLayout',
                path.join(root, 'app', 'components', 'StandardLayout'));

        gen.dir('assets',
                path.join(root, 'assets', 'react-mdl'));

        gen.template('Dashboard.jsx.ejs',
                path.join(root, 'app', 'routes', 'Dashboard', 'components', 'Dashboard.jsx'));


        gen.replace(/<\/head>/, `
<link rel="stylesheet" href="material.css">
<link rel="stylesheet" href="material_overrides.css">
<script src="material.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>
`, path.join(root, 'app', 'index.html'));

        gen.replace(/require\('file\?name=/,
`require('file?name=[name].[ext]!../assets/react-mdl/material.css');
require('file?name=[name].[ext]!../assets/react-mdl/material.js');
require('file?name=[name].[ext]!../assets/react-mdl/material_overrides.css');
require('file?name=`, path.join(root, 'app', 'Main.jsx'));
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

  dasherizeName() {
    return this.gen.inflect.dasherize(this.name);
  }

  camelizeName() {
    return this.gen.inflect.camelize(this.name);
  }

}

module.exports = ReactmdlGenerator;
