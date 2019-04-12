export const FILE_NOT_EXIST = "FILE_NOT_EXIST";
export const NOT_ALLOWED_CHAR = "NOT_ALLOWED_CHAR";
export const BAD_RULE_FORMATTING = "BAD_RULE_FORMATTING";
export const BAD_SYMBOL_NUMBER = "BAD_SYMBOL_NUMBER";
export const NO_QUERY_IN_RULE = "NO_QUERY_IN_RULE";
export const MULTIPLE_LETTERS = "MULTIPLE_LETTERS";
export const LETTER_AND_BRACKET = "LETTER_AND_BRACKET";
export const BRACKET_AND_LETTER = "BRACKET_AND_LETTER";
export const RULE_START_WITH_SIGN = "RULE_START_WITH_SIGN";
export const RULE_END_WITH_SIGN = "RULE_END_WITH_SIGN";

/* eslint-disable no-useless-escape */
export const SYMBOLS = [
  {
    key: "left-bracket",
    regex: /[^(]/,
    value: "("
  },
  {
    key: "right-bracket",
    regex: /[^)]/,
    value: ")"
  },
  {
    key: "exclamation-mark",
    regex: /[^!]/,
    value: "!"
  },
  {
    key: "plus",
    regex: /[^\+]/,
    value: "+"
  },
  {
    key: "pipe",
    regex: /[^\|]/,
    value: "|"
  },
  {
    key: "xor",
    regex: /[^\^]/,
    value: "^"
  },
];
/* eslint-enable no-useless-escape */
