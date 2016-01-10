var ejs = require('ejs');
var chalk = require('chalk');
var glob = require ('glob');
var inflect = require('inflect');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

// Yeoman Libraries
var TerminalAdapter = require('../conflicter/adapter.js');
var Conflicter = require('../conflicter/conflicter.js');

let config = {
  domainIndex: 'domains/index.js',
  domainDirectory: 'domains',
  generatorDirectory: 'generators'
}

let inspect = JSON.stringify

//let domainsPath = path.join(__dirname, config.domainIndex);
//let domains = require(domainsPath);
let domains = {}

class GenerateCore {
  constructor({templatePath, shouldForce}) {
    this.templatePath = templatePath;
    this.inflect = inflect;
    this.config = config;
    this.domains = domains;
    this.terminal = new TerminalAdapter();
    this.conflicter = new Conflicter(this.terminal, shouldForce);
    this.isReady = false;
    this.jobs = [];
  }

  /**
   * Copy file from template to application
   * the answer(s) to the provided callback.
   *
   * @param {src} path relative to template folder
   * @param {dest} path relative to application root
   */
  file(src, dest) {
    this.assertReady("file()");
    let job = 'file';
    this.jobs.push({job, src, dest});
  }

  /**
   * Render EJS template and copy into application
   *
   * @param {src} path relative to template folder
   * @param {dest} path relative to application root
   */
  template(src, dest) {
    this.assertReady("template()");
    let job = 'template';
    this.jobs.push({job, src, dest})
  }

  /**
   * If destination does not exist render EJS template and copy into dest
   *
   * @param {src} path relative to template folder
   * @param {dest} path relative to application root
   */
  assureTemplate(src, dest) {
    this.assertReady("assureTemplate()");
    let job = 'assureTemplate';
    this.jobs.push({job, src, dest})
  }


  /**
   * Inject import statement into dest file
   *
   * @param {_import}
   * @param {_from}
   */
  injectImport(statement, dest) {
    this.assertReady("file()");
    let job = 'injectImport';
    this.jobs.push({job, statement, dest});
  }

  /**
   * Inject code into file at dest using contents
   * from template
   *
   * @param {marker} delimeter 2
   * @param {src} path relative to template folder
   * @param {dest} path relative to application root
   */
  inject(marker, src, dest) {
    this.assertReady("inject()");
    let job = 'inject';
    this.jobs.push({job, marker, src, dest});
  }

  // PRIVATE

  aInjectProperty({variable, property, valueCode, dest}) {
    let destPath = path.join(process.cwd(), dest);
    let destContents = fs.readFileSync(destPath, "utf8");
    let p = inject(destContents, variable, property, valueCode);
    p.then( (content) => {
      this.resolve(destPath, content);
    })
  }

  aAssureTemplate({src, dest}) {
    let destPath = path.join(process.cwd(), dest);
    let exists = fs.existsSync(destPath);
    if (!exists) {
      this.aTemplate({src, dest})
    } else {
      this.jobs.shift();
      this.finish();
    }
  }

  aFile({src, dest}) {
    let srcPath = path.join(this.templatePath, src);
    let destPath = path.join(process.cwd(), dest);
    let contents = fs.readFileSync(srcPath);
    this.resolve(destPath, contents);
  }

  aTemplate({src, dest}) {
    let srcPath = path.join(this.templatePath, src);
    let destPath = path.join(process.cwd(), dest);
    let templateContents = fs.readFileSync(srcPath, "utf8");
    let template = ejs.compile(templateContents);
    let contents = template({ctx: this.gObj});
    this.resolve(destPath, contents);
  }

  aInjectImport({statement, dest}) {
    let destPath = path.join(process.cwd(), dest);
    let destContents = fs.readFileSync(destPath, "utf8");

    // Find the last import statement
    let r = new RegExp("^import.*?$(?!.*^import)", "m")
    let match = destContents.match(r);
    if (match != null) {
      destContents = destContents.replace(r, match[0]+'\n'+statement);
      this.resolve(destPath, destContents);
      return;
    }

    // Or the 'use strict' thing
    r = new RegExp("^.use strict.*?$(?!.*^import)", "m")
    match = destContents.match(r);
    if (match != null) {
      destContents = destContents.replace(r, match[0]+'\n'+statement);
      this.resolve(destPath, destContents);
      return;
    }

    // Or just resort to top of file
    destContents = statement+'\n'+ destContents;
    this.resolve(destPath, destContents);
  }

  aInject({marker, src, dest}) {
    // console.log(`INJECT ${marker} ${src} ${dest}`);
    let srcPath = path.join(this.templatePath, src);
    let destPath = path.join(process.cwd(), dest);
    let templateContents = fs.readFileSync(srcPath, "utf8");
    let template = ejs.compile(templateContents);
    let contents = template({ctx: this.gObj});

    let destContents = fs.readFileSync(destPath, "utf8");
    let injectedContents = destContents.replace(marker, contents+marker);
    this.resolve(destPath, injectedContents);
  }

  resolve(destPath, contents) {
    this.conflicter.checkForCollision(destPath, contents, (n, status) => {
      if (status == 'create' || status == 'write' || status == 'force') {
        this.writeContents(destPath, contents, () => {
          this.jobs.shift();
          this.finish();
        });
      }
      if (status == 'abort') {
        console.log('abort');
      }
      if (status == 'skip' || status == 'identical') {
        this.jobs.shift();
        this.finish();
      }
    });
    return this.conflicter.resolve();
  }

  writeContents(destPath, contents, cb) {
    let dir = path.dirname(destPath);
    mkdirp(dir, (err) => {
      if (err) throw err;
      fs.writeFileSync(destPath, contents);
      cb();
    });
  }


  assertReady(procName) {
    if (!this.isReady) {
      throw `Error: ${inspect(procName)} called before ready.  This is most likely because you called ${inspect(procName)} from inside your generators constructor.`;
    }
  }

  makeReady(gObj) {
    this.gObj = gObj;
    this.isReady = true;
  }


  finish() {
    if (this.jobs.length == 0 ) {
      return
    } else {
      let j = this.jobs[0];
      switch (j.job) {
        case 'file':
          this.aFile(j);
          break
        case 'template':
          this.aTemplate(j);
          break
        case 'assureTemplate':
          this.aAssureTemplate(j);
          break
        case 'injectProperty':
          this.aInjectProperty(j);
          break
        case 'injectImport':
          this.aInjectImport(j);
          break
        case 'inject':
          this.aInject(j);
          break
      }
    }
  }

}

module.exports = GenerateCore;
