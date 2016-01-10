'use strict';

var babel = require('babel-core');
var fs = require('fs');
var estraverse = require('estraverse');
var beautify = require('js-beautify').js_beautify;

function findObjectExpressionAssignedTo(ast, varname) {
  var cb = function cb(node) {
    return node;
  };
  var p = new Promise(function (cb) {
    estraverse.traverse(ast, {
      enter: function enter(node, parent) {
        if (node.type == 'ObjectExpression' && parent.type == 'VariableDeclarator' && parent.id.name == varname) {
          cb(node);
          return estraverse.VisitorOption.Break;
        }
      }
    });
  });

  return p;
}

function injectProperty(code, trgVar, newProp, newPropValue) {
  var p = new Promise(function (cb) {
    var ast = babel.parse(code);
    var findP = findObjectExpressionAssignedTo(ast, trgVar);
    findP.then(function (node) {
      var snippet = code.slice(node.start, node.end);
      var pCount = node.properties.length;
      var insertAt = 0;
      var spaces = 4;
      var delim = ',';
      if (pCount > 0) {
        insertAt = node.properties[node.properties.length - 1].end - node.start;
      } else {
        insertAt = 1;
        delim = '';
      }
      var newCode = snippet.slice(0, insertAt) + delim + "\n" + Array(4).join(" ") + newProp + ':' + newPropValue + snippet.slice(insertAt);
      var newCleanCode = beautify(newCode);
      var results = code.slice(0, node.start) + newCleanCode + code.slice(node.end);
      cb(results);
    });
  });
  return p;
}

module.exports = injectProperty;