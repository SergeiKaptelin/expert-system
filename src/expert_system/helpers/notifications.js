import colors from "colors";

import {
  FILE_NOT_EXIST,
  NOT_ALLOWED_CHAR,
  BAD_RULE_FORMATTING,
  BAD_SYMBOL_NUMBER,
  NO_QUERY_IN_RULE,
  MULTIPLE_LETTERS,
  LETTER_AND_BRACKET,
  BRACKET_AND_LETTER,
  RULE_START_WITH_SIGN,
  RULE_END_WITH_SIGN,
  NO_SPACE_AFTER_SIGN,
  NO_SIGN_BEFORE_EXCLAMATION,
  BAD_OPERATION,
  MULTIPLE_SIGNS,
  MULTIPLE_EXCLAMATION,
  BAD_BRACKETS_POSITION,
  EXCLAMATION_WITH_BRACKETS,
  EMPTY_RULES,
  EMPTY_QUERIES,
  BAD_FACTS_COUNTER,
  BAD_QUERIES_COUNTER,
} from "../constants/constants";

/* eslint-disable default-case*/
const errorMessages = (key, message) => {
  switch (key) {
    case FILE_NOT_EXIST:
      return `File ${message} not exist`;
    case NOT_ALLOWED_CHAR:
      return `Letters '${message}' is not allowed, you could use only this characters "A-Z()!+|^=>< "`;
    case BAD_RULE_FORMATTING:
      return "Bad rule formatting, valid formatting e.g. A + B => C";
    case BAD_SYMBOL_NUMBER:
      return `To many ${message}, valid formatting e.g. (B | C) => (D ^ F)`;
    case NO_QUERY_IN_RULE:
      return `No ${message} in rules`;
    case MULTIPLE_LETTERS:
      return "Don't use multiple letters side by side";
    case LETTER_AND_BRACKET:
      return "Between letter and open bracket '(' should be a sign";
    case BRACKET_AND_LETTER:
      return "Between close bracket ')' and letter should be a sign";
    case RULE_START_WITH_SIGN:
      return "Don't start rule with a sign";
    case RULE_END_WITH_SIGN:
      return "Don't end rule with a sign";
    case NO_SPACE_AFTER_SIGN:
      return "Please remove spaces after exclamation mark '!'";
    case NO_SIGN_BEFORE_EXCLAMATION:
      return "Please add sign between letter and exclamation mark '!'";
    case BAD_OPERATION:
      return "Bed operation formatting, please check you type correct '=>' or '<=>'";
    case MULTIPLE_SIGNS:
      return "Don't use multiple signs side by side";
    case MULTIPLE_EXCLAMATION:
      return "Don't use multiple exclamation mark '!!'";
    case BAD_BRACKETS_POSITION:
      return `Bad brackets position ${message}`;
    case EXCLAMATION_WITH_BRACKETS:
      return "Don't use exclamation mark '!' with brackets";
    case EMPTY_RULES:
      return "Please add at least one rule";
    case EMPTY_QUERIES:
      return "Please add at least one query";
    case BAD_FACTS_COUNTER:
      return "Please add only one facts row after '='";
    case BAD_QUERIES_COUNTER:
      return "Please add only one queries row after '?'";
  }
};
/* eslint-enable default-case*/

const error = (key, message = "") => {
  const errorMessage = errorMessages(key, message.yellow);
  console.log(colors.red("ERROR!"), errorMessage);
  process.exit(0);
};

const usage = () => {
  console.log(colors.yellow("Usage: ./expert_system filename"));
  console.log(colors.yellow("   filename - path to file with rules"));
  process.exit(0);
};

export {
  errorMessages,
  usage,
  error,
};