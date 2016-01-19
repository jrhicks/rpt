const ejs = require('ejs');
const inflect = require('inflect');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const findRoot = require('find-root');
const glob = require('glob');

// Yeoman Libraries
const TerminalAdapter = require('../conflicter/adapter.js');
const Conflicter = require('../conflicter/conflicter.js');

const config = {
  domainIndex: 'domains/index.js',
  domainDirectory: 'domains',
  generatorDirectory: 'generators'
};

const inspect = JSON.stringify;

class GenerateCore {
  constructor({ templatePath, shouldForce }) {
    this.templatePath = templatePath;
    this.inflect = inflect;
    this.config = config;
    this.domains = {};
    this.findRoot = () => findRoot(process.cwd());

    this.terminal = new TerminalAdapter();
    this.conflicter = new Conflicter(this.terminal, shouldForce);
    this.isReady = false;
    this.jobs = [];
  }

  /**
   * Deep copy directory
   *
   * @param {src} path relative to template folder
   * @param {dest} absolute path
   */
  dir(dirSrc, dirDest) {
    const job = 'template';
    const srcPath = path.join(this.templatePath, dirSrc);
    const destPath = dirDest; // path.join(process.cwd(), dest);
    // options is optional
    const files = glob.sync(path.join(srcPath, '**/*'));
    for (const f of files) {
      if (fs.lstatSync(f).isFile()) {
        // fsrc is relative path to file from template folder
        const src = path.relative(this.templatePath, f);
        // fdest is absolute destination, computed by applying
        // the relative path of file from src to supplied destination
        const dest = path.resolve(destPath, path.relative(srcPath, f));
        this.jobs.push({ job, src, dest });
      }
    }
  }

  /**
   * Deep copy directory
   *
   * @param {code} code to append to bottom of file
   * @param {dest} absolute path
   */
  append(code, dest) {
    const job = 'append';
    this.jobs.push({ job, code, dest });
  }

  /**
   * Copy file from template to application
   * the answer(s) to the provided callback.
   *
   * @param {src} path relative to template folder
   * @param {dest} absolute path
   */
  file(src, dest) {
    this.assertReady('file()');
    const job = 'file';
    this.jobs.push({ job, src, dest });
  }

  /**
   * Replace expression with text in destination file
   *
   * @param {expression} value to replace
   * @param {text} value to replace with
   * @param {dest} absolute path
   */
  replace(expression, text, dest) {
    this.assertReady('template()');
    const job = 'replace';
    this.jobs.push({ job, expression, text, dest });
  }

  /**
   * Render EJS template and copy into application
   *
   * @param {src} path relative to template folder
   * @param {dest} absolute path
   */
  template(src, dest) {
    this.assertReady('template()');
    const job = 'template';
    this.jobs.push({ job, src, dest });
  }

  /**
   * If destination does not exist render EJS template and copy into dest
   *
   * @param {src} path relative to template folder
   * @param {dest} absolute path
   */
  assureTemplate(src, dest) {
    this.assertReady('assureTemplate()');
    const job = 'assureTemplate';
    this.jobs.push({ job, src, dest });
  }

  /**
   * Inject import statement into dest file
   *
   * @param {_import}
   * @param {_from}
   */
  injectImport(statement, dest) {
    this.assertReady('file()');
    const job = 'injectImport';
    this.jobs.push({ job, statement, dest });
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
    this.assertReady('inject()');
    const job = 'inject';
    this.jobs.push({ job, marker, src, dest });
  }

  // PRIVATE

  aAssureTemplate({ src, dest }) {
    const destPath = dest; // path.join(process.cwd(), dest);
    const exists = fs.existsSync(destPath);
    if (!exists) {
      this.aTemplate({ src, dest });
    } else {
      this.jobs.shift();
      this.finish();
    }
  }

  aFile({ src, dest }) {
    const srcPath = path.join(this.templatePath, src);
    const destPath = dest; // path.join(process.cwd(), dest);
    const contents = fs.readFileSync(srcPath);
    this.resolve(destPath, contents);
  }

  aTemplate({ src, dest }) {
    const srcPath = path.join(this.templatePath, src);
    const destPath = dest; // path.join(process.cwd(), dest);
    const templateContents = fs.readFileSync(srcPath, 'utf8');
    const template = ejs.compile(templateContents);
    const contents = template({ ctx: this.gObj });
    this.resolve(destPath, contents);
  }

  aInjectImport({ statement, dest }) {
    const destPath = dest; // path.join(process.cwd(), dest);
    let destContents = fs.readFileSync(destPath, 'utf8');

    // Find the last import statement
    let r = new RegExp('^import.*?$(?!.*^import)', 'm');
    let match = destContents.match(r);
    if (match !== null) {
      destContents = destContents.replace(r, match[0] + '\n' + statement);
      this.resolve(destPath, destContents);
      return;
    }

    // Or the 'use strict' thing
    r = new RegExp('^.use strict.*?$(?!.*^import)', 'm');
    match = destContents.match(r);
    if (match !== null) {
      destContents = destContents.replace(r, match[0] + '\n' + statement);
      this.resolve(destPath, destContents);
      return;
    }

    // Or just resort to top of file
    destContents = statement + '\n' + destContents;
    this.resolve(destPath, destContents);
  }

  aInject({ marker, src, dest }) {
    // console.log(`INJECT ${marker} ${src} ${dest}`);
    const srcPath = path.join(this.templatePath, src);
    const destPath = dest; // path.join(process.cwd(), dest);
    const templateContents = fs.readFileSync(srcPath, 'utf8');
    const template = ejs.compile(templateContents);
    const contents = template({ ctx: this.gObj });

    const destContents = fs.readFileSync(destPath, 'utf8');
    const injectedContents = destContents.replace(marker, contents + marker);
    this.resolve(destPath, injectedContents);
  }

  aAppend({ code, dest }) {
    let destContents = fs.readFileSync(dest, 'utf8');
    destContents = `${destContents}
${code}`;
    this.resolve(dest, destContents);
  }

  aReplace({ expression, text, dest }) {
    const destContents = fs.readFileSync(dest, 'utf8');
    const injectedContents = destContents.replace(expression, text);
    this.resolve(dest, injectedContents);
  }

  resolve(destPath, contents) {
    this.conflicter.checkForCollision(destPath, contents, (n, status) => {
      if (status === 'create' || status === 'write' || status === 'force') {
        this.writeContents(destPath, contents, () => {
          this.jobs.shift();
          this.finish();
        });
      }

      if (status === 'abort') {
        console.log('abort');
      }

      if (status === 'skip' || status === 'identical') {
        this.jobs.shift();
        this.finish();
      }
    });
    return this.conflicter.resolve();
  }

  writeContents(destPath, contents, cb) {
    const dir = path.dirname(destPath);
    mkdirp(dir, (err) => {
      if (err) throw err;
      fs.writeFileSync(destPath, contents);
      cb();
    });
  }


  assertReady(procName) {
    if (!this.isReady) {
      console.log(`Error: ${inspect(procName)} called inside constructor;`);
      process.exit();
    }
  }

  makeReady(gObj) {
    this.gObj = gObj;
    this.isReady = true;
  }


  finish() {
    if (this.jobs.length !== 0) {
      const j = this.jobs[0];
      switch (j.job) {
        case 'file':
          this.aFile(j);
          break;
        case 'template':
          this.aTemplate(j);
          break;
        case 'replace':
          this.aReplace(j);
          break;
        case 'assureTemplate':
          this.aAssureTemplate(j);
          break;
        case 'injectProperty':
          this.aInjectProperty(j);
          break;
        case 'injectImport':
          this.aInjectImport(j);
          break;
        case 'exec':
          this.aExec(j);
          break;
        case 'append':
          this.aAppend(j);
          break;
        case 'inject':
          this.aInject(j);
          break;
        default:
          console.log(`Unrecognized job: '${j}'`);
          break;
      }
    }
  }

}

module.exports = GenerateCore;
