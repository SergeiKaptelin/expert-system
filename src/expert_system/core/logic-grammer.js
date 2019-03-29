// Generated automatically by nearley, version 2.16.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
 var ast = require('./ast.js'); var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["_", "EXP", "_"], "postprocess": function(d) { return d[1]; }},
    {"name": "NOT", "symbols": [{"literal":"!"}]},
    {"name": "AND", "symbols": [{"literal":"+"}]},
    {"name": "OR", "symbols": [{"literal":"|"}]},
    {"name": "XOR", "symbols": [{"literal":"^"}]},
    {"name": "IMPLY$string$1", "symbols": [{"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "IMPLY", "symbols": ["IMPLY$string$1"]},
    {"name": "IFF$string$1", "symbols": [{"literal":"<"}, {"literal":"="}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "IFF", "symbols": ["IFF$string$1"]},
    {"name": "EXP", "symbols": [{"literal":"("}, "_", "EXP", "_", {"literal":")"}], "postprocess": function(d) { return d[2]; }},
    {"name": "EXP", "symbols": ["X_IFF_Y"]},
    {"name": "EXP", "symbols": ["X_IMPLY_Y"]},
    {"name": "EXP", "symbols": ["X_XOR_Y"]},
    {"name": "EXP", "symbols": ["X_OR_Y"]},
    {"name": "EXP", "symbols": ["X_AND_Y"]},
    {"name": "EXP", "symbols": ["NOT_X"]},
    {"name": "EXP", "symbols": ["ATOM"]},
    {"name": "NOT_X", "symbols": ["NOT", "_", "EXP"], "postprocess": function(d) { return ast.Not(d[0], d[2]); }},
    {"name": "X_AND_Y", "symbols": ["EXP", "_", "AND", "_", "EXP"], "postprocess": function(d) { return ast.And(d[2], d[0], d[4]); }},
    {"name": "X_OR_Y", "symbols": ["EXP", "_", "OR", "_", "EXP"], "postprocess": function(d) { return ast.Or(d[2], d[0], d[4]); }},
    {"name": "X_XOR_Y", "symbols": ["EXP", "_", "XOR", "_", "EXP"], "postprocess": function(d) { return ast.Xor(d[2], d[0], d[4]); }},
    {"name": "X_IMPLY_Y", "symbols": ["EXP", "_", "IMPLY", "_", "EXP"], "postprocess": function(d) { return ast.Imply(d[2], d[0], d[4]); }},
    {"name": "X_IFF_Y", "symbols": ["EXP", "_", "IFF", "_", "EXP"], "postprocess": function(d) { return ast.Iff(d[2], d[0], d[4]); }},
    {"name": "ATOM", "symbols": ["TEXT"], "postprocess": function(d) { return ast.Atom(null, d[0]); }},
    {"name": "WORD", "symbols": [/[a-zA-Z]/], "postprocess": id},
    {"name": "WORD", "symbols": ["WORD", /[a-zA-Z]/], "postprocess": function(d) {return d[0] + d[1];}},
    {"name": "TEXT", "symbols": ["WORD"], "postprocess": id},
    {"name": "TEXT", "symbols": ["WORD", "_", "WORD"], "postprocess": function(d) {return d[0] + ' ' + d[2];}},
    {"name": "_", "symbols": [], "postprocess": function(d) {return null; }},
    {"name": "_", "symbols": ["_", /[\s]/], "postprocess": function(d) {return null; }}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
