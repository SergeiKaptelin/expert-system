import nearley from "nearley";

import Ast from "./ast";
import grammar from "./logic-grammer";

const astFromString = (str) => {
  var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
  var output = parser.feed(str).results;
  if(!(output.length && output[0].length)) return null;
  return dearray(output[0]);
};

function dearray(ast) {
  if(Array.isArray(ast) && ast.length === 1) {
    var _ast = ast[0];
    _ast.left = dearray(_ast.left);
    _ast.right = dearray(_ast.right);
    return _ast;
  }
  return ast;
}

function tableFromAst(ast) {
  var nodes = nodeList(ast);
  var atomics = nodes.filter(function(node) {
    return node.type === 'atom';
  }).reduce(unique, []).sort(alphabetical);
  var complex = nodes.filter(function(node) {
    return node.type !== 'atom';
  }).reduce(unique, []).sort(alphabetical);

  var bools = boolMatrix(atomics.length);
  var atomSets = [];
  var rowN = bools.length;
  var colN = bools[0].length;
  for(var i = 0; i < rowN; i++) {
    var set = {};
    for(var j = 0; j < colN; j++) {
      set[atomics[j].left] = bools[i][j];
    }
    atomSets.push(set);
  }

  var combos = complex.reduce(function(table, prop, index) {
    table.push(atomSets.map(function(atomSet) {
      return Ast.evaluate(prop, atomSet);
    }));
    return table;
  }, []);

  var table = combos.reduce(function(table, row) {
    row.forEach(function(bool, j) {
      table[j].push(bool);
    });
    return table;
  }, bools);

  const head = atomics.concat(complex).map((item) => Ast.print(item));
  var tableTrueResult = table.filter((row) => row[row.length - 1] !== false);

  return {
    head: head,
    body: tableTrueResult.map((row) => row.map((cell, i) => {
      return {
        name: head[i],
        value: cell,
      };
    })),
  };
}

function nodeList(ast) {
  var list = [];
  (function _nodeList(ast) {
    list.push(ast);
    if(ast.type === 'atom') return;
    if(ast.left) _nodeList(ast.left);
    if(ast.right) _nodeList(ast.right);
  })(ast);
  return list;
}

function unique(list, next) {
  if(list.map(Ast.print).indexOf(Ast.print(next)) === -1) {
    list.push(next);
  }
  return list;
}

function alphabetical(a, b) {
  var at = Ast.print(a);
  var bt = Ast.print(b);
  var lx = at.length - bt.length;
  if(!lx) return at.localeCompare(bt);
  return lx;
}

function boolMatrix(n) {
  var mat = [];
  (function _boolMatrix(set, c) {
    if(!c) return mat.push(set);
    _boolMatrix(set.concat(true), c - 1);
    _boolMatrix(set.concat(false), c - 1);
  })([], n);
  return mat;
}

const truthTable = (row) => {
  const ast = astFromString(row);
  return tableFromAst(ast);
};

export default truthTable;
