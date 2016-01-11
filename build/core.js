'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ejs = require('ejs');
var inflect = require('inflect');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

// Yeoman Libraries
var TerminalAdapter = require('../conflicter/adapter.js');
var Conflicter = require('../conflicter/conflicter.js');

var config = {
  domainIndex: 'domains/index.js',
  domainDirectory: 'domains',
  generatorDirectory: 'generators'
};

var inspect = JSON.stringify;

var GenerateCore = (function () {
  function GenerateCore(_ref) {
    var templatePath = _ref.templatePath;
    var shouldForce = _ref.shouldForce;

    _classCallCheck(this, GenerateCore);

    this.templatePath = templatePath;
    this.inflect = inflect;
    this.config = config;
    this.domains = {};
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
   * @param {dest} absolute path
   */

  _createClass(GenerateCore, [{
    key: 'file',
    value: function file(src, dest) {
      this.assertReady('file()');
      var job = 'file';
      this.jobs.push({ job: job, src: src, dest: dest });
    }

    /**
     * Replace expression with text in destination file
     *
     * @param {expression} value to replace
     * @param {text} value to replace with
     * @param {dest} absolute path
     */

  }, {
    key: 'replace',
    value: function replace(expression, text, dest) {
      this.assertReady('template()');
      var job = 'replace';
      this.jobs.push({ job: job, expression: expression, text: text, dest: dest });
    }

    /**
     * Render EJS template and copy into application
     *
     * @param {src} path relative to template folder
     * @param {dest} absolute path
     */

  }, {
    key: 'template',
    value: function template(src, dest) {
      this.assertReady('template()');
      var job = 'template';
      this.jobs.push({ job: job, src: src, dest: dest });
    }

    /**
     * If destination does not exist render EJS template and copy into dest
     *
     * @param {src} path relative to template folder
     * @param {dest} absolute path
     */

  }, {
    key: 'assureTemplate',
    value: function assureTemplate(src, dest) {
      this.assertReady('assureTemplate()');
      var job = 'assureTemplate';
      this.jobs.push({ job: job, src: src, dest: dest });
    }

    /**
     * Inject import statement into dest file
     *
     * @param {_import}
     * @param {_from}
     */

  }, {
    key: 'injectImport',
    value: function injectImport(statement, dest) {
      this.assertReady('file()');
      var job = 'injectImport';
      this.jobs.push({ job: job, statement: statement, dest: dest });
    }

    /**
     * Inject code into file at dest using contents
     * from template
     *
     * @param {marker} delimeter 2
     * @param {src} path relative to template folder
     * @param {dest} path relative to application root
     */

  }, {
    key: 'inject',
    value: function inject(marker, src, dest) {
      this.assertReady('inject()');
      var job = 'inject';
      this.jobs.push({ job: job, marker: marker, src: src, dest: dest });
    }

    // PRIVATE

  }, {
    key: 'aAssureTemplate',
    value: function aAssureTemplate(_ref2) {
      var src = _ref2.src;
      var dest = _ref2.dest;

      var destPath = dest; // path.join(process.cwd(), dest);
      var exists = fs.existsSync(destPath);
      if (!exists) {
        this.aTemplate({ src: src, dest: dest });
      } else {
        this.jobs.shift();
        this.finish();
      }
    }
  }, {
    key: 'aFile',
    value: function aFile(_ref3) {
      var src = _ref3.src;
      var dest = _ref3.dest;

      var srcPath = path.join(this.templatePath, src);
      var destPath = dest; // path.join(process.cwd(), dest);
      var contents = fs.readFileSync(srcPath);
      this.resolve(destPath, contents);
    }
  }, {
    key: 'aTemplate',
    value: function aTemplate(_ref4) {
      var src = _ref4.src;
      var dest = _ref4.dest;

      var srcPath = path.join(this.templatePath, src);
      var destPath = dest; // path.join(process.cwd(), dest);
      var templateContents = fs.readFileSync(srcPath, 'utf8');
      var template = ejs.compile(templateContents);
      var contents = template({ ctx: this.gObj });
      this.resolve(destPath, contents);
    }
  }, {
    key: 'aInjectImport',
    value: function aInjectImport(_ref5) {
      var statement = _ref5.statement;
      var dest = _ref5.dest;

      var destPath = dest; // path.join(process.cwd(), dest);
      var destContents = fs.readFileSync(destPath, 'utf8');

      // Find the last import statement
      var r = new RegExp('^import.*?$(?!.*^import)', 'm');
      var match = destContents.match(r);
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
  }, {
    key: 'aInject',
    value: function aInject(_ref6) {
      var marker = _ref6.marker;
      var src = _ref6.src;
      var dest = _ref6.dest;

      // console.log(`INJECT ${marker} ${src} ${dest}`);
      var srcPath = path.join(this.templatePath, src);
      var destPath = dest; // path.join(process.cwd(), dest);
      var templateContents = fs.readFileSync(srcPath, 'utf8');
      var template = ejs.compile(templateContents);
      var contents = template({ ctx: this.gObj });

      var destContents = fs.readFileSync(destPath, 'utf8');
      var injectedContents = destContents.replace(marker, contents + marker);
      this.resolve(destPath, injectedContents);
    }
  }, {
    key: 'aReplace',
    value: function aReplace(_ref7) {
      var expression = _ref7.expression;
      var text = _ref7.text;
      var dest = _ref7.dest;

      var destContents = fs.readFileSync(dest, 'utf8');
      var injectedContents = destContents.replace(expression, text);
      this.resolve(dest, injectedContents);
    }
  }, {
    key: 'resolve',
    value: function resolve(destPath, contents) {
      var _this = this;

      this.conflicter.checkForCollision(destPath, contents, function (n, status) {
        if (status === 'create' || status === 'write' || status === 'force') {
          _this.writeContents(destPath, contents, function () {
            _this.jobs.shift();
            _this.finish();
          });
        }

        if (status === 'abort') {
          console.log('abort');
        }

        if (status === 'skip' || status === 'identical') {
          _this.jobs.shift();
          _this.finish();
        }
      });
      return this.conflicter.resolve();
    }
  }, {
    key: 'writeContents',
    value: function writeContents(destPath, contents, cb) {
      var dir = path.dirname(destPath);
      mkdirp(dir, function (err) {
        if (err) throw err;
        fs.writeFileSync(destPath, contents);
        cb();
      });
    }
  }, {
    key: 'assertReady',
    value: function assertReady(procName) {
      if (!this.isReady) {
        console.log('Error: ' + inspect(procName) + ' called inside constructor;');
        process.exit();
      }
    }
  }, {
    key: 'makeReady',
    value: function makeReady(gObj) {
      this.gObj = gObj;
      this.isReady = true;
    }
  }, {
    key: 'finish',
    value: function finish() {
      if (this.jobs.length !== 0) {
        var j = this.jobs[0];
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
          case 'inject':
            this.aInject(j);
            break;
          default:
            console.log('Unrecognized job.');
            break;
        }
      }
    }
  }]);

  return GenerateCore;
})();

module.exports = GenerateCore;