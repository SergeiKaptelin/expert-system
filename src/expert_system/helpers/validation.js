import {error} from "./notifications";

import {
  EMPTY_RULES,
  EMPTY_QUERIES,
  NO_QUERY_IN_RULE,
  NOT_ALLOWED_CHAR,
  BAD_RULE_FORMATTING,
  BAD_SYMBOL_NUMBER,
  MULTIPLE_LETTERS,
  LETTER_AND_BRACKET,
  BRACKET_AND_LETTER,
  RULE_START_WITH_SIGN,
  RULE_END_WITH_SIGN,
  NO_SPACE_AFTER_SIGN,
  NO_SIGN_BEFORE_EXCLAMATION,
  BAD_OPERATION, MULTIPLE_SIGNS, 
  MULTIPLE_EXCLAMATION, 
  BAD_BRACKETS_POSITION, 
  EXCLAMATION_WITH_BRACKETS,
} from "../constants/constants";

/* eslint-disable no-useless-escape */
const allowedChar = (char) => /[A-Z()!\+\|\^\ <=>]/.test(char);

const countChar = (str, regex) => str.replace(new RegExp(regex, "g"), "").length;

const ruleStructure = (str) => str && /^[A-Z()!\+\|\^\ ]+(=>|<=>)[A-Z()!\+\|\^\ ]+$/.test(str);

const validateStructure = (row) => {
  if (!ruleStructure(row)) {
    const ruleChars = row.split("");
    const notAllowedChars = ruleChars.filter((char) => !allowedChar(char));
    const uniqueNotAllowedChars = [...new Set(notAllowedChars)];
    if (uniqueNotAllowedChars.length > 0) {
      error(NOT_ALLOWED_CHAR, uniqueNotAllowedChars.join(""));
    } else {
      error(BAD_RULE_FORMATTING, uniqueNotAllowedChars.join(""));
    }
  }
};

const validateBrackets = (row) => {
  const tempRow = row.replace(/(=>|<=>)/, "@");
  const ruleParts = tempRow.split("@");
  ruleParts.forEach((part, index) => {
    if (countChar(part, /[^(]/) > countChar(part, /[^)]/)) {
      error(BAD_SYMBOL_NUMBER, `'(' in ${index === 0 ? "left" : "right"} part of the rule`);
    }
    if (countChar(part, /[^(]/) < countChar(part, /[^)]/)) {
      error(BAD_SYMBOL_NUMBER, `')' in ${index === 0 ? "left" : "right"} part of the rule`);
    }
  });
};

const checkLetters = (row) => {
  if (/[A-Z]\ *[A-Z]/g.test(row)) {
    error(MULTIPLE_LETTERS);
  }
  if (/[A-Z]\ *\(/g.test(row)) {
    error(LETTER_AND_BRACKET);
  }
  if (/\) *[A-Z]/g.test(row)) {
    error(BRACKET_AND_LETTER);
  }
  if (/^\ *[+\|\^]\ *[A-Z]/g.test(row)) {
    error(RULE_START_WITH_SIGN);
  }
  if (/[A-Z]\ *[!\+\|\^]\ *$/g.test(row)) {
    error(RULE_END_WITH_SIGN);
  }
};

const checkSymbols = (row) => {
  if (/! +[A-Z]/g.test(row)) {
    error(NO_SPACE_AFTER_SIGN);
  }
  if (/[A-Z]\ *![A-Z]/g.test(row)) {
    error(NO_SIGN_BEFORE_EXCLAMATION);
  }
  if (/[!\+\|\^]\ *=|=[!\+\|\^\ ]/g.test(row)) {
    error(BAD_OPERATION);
  }
  const trimmedRow = row.split(" ").join("");
  if (/[!\+\|\^][+\|\^]/g.test(trimmedRow)) {
    error(MULTIPLE_SIGNS);
  }
  if (/!!/g.test(trimmedRow)) {
    error(MULTIPLE_EXCLAMATION);
  }
  if (/\)\(/g.test(trimmedRow)) {
    error(BAD_BRACKETS_POSITION, "')('");
  }
  if (/\(\)/g.test(trimmedRow)) {
    error(BAD_BRACKETS_POSITION, "'()'");
  }
  if (/!\(|\)!/g.test(trimmedRow)) {
    error(EXCLAMATION_WITH_BRACKETS);
  }
};
/* eslint-enable no-useless-escape */

const validateFile = (data) => {
  const {rules, initialQueries} = data;
  if (rules.length === 0) {
    error(EMPTY_RULES);
  }
  if (Object.entries(initialQueries).length === 0) {
    error(EMPTY_QUERIES);
  }
  const queries = initialQueries.row.split("");
  queries.forEach((query) => {
    let queryFound = false;
    rules.forEach((rule) => {
      if (rule && rule.row && rule.row.indexOf(query) >= 0) {
        queryFound = true;
      }
    });
    if (!queryFound) {
      error(NO_QUERY_IN_RULE, `'${query}'`);
    }
  });
  rules.forEach((rule) => {
    validateStructure(rule.row);
    validateBrackets(rule.row);
    checkLetters(rule.row);
    checkSymbols(rule.row);
  });
};

export {
  validateFile,
};
