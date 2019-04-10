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
  }
};
/* eslint-enable default-case*/

const error = (key, message = "") => {
  const errorMessage = errorMessages(key, message.yellow);
  console.log(colors.red("ERROR!"), errorMessage);
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