import {errorMessages} from "../expert_system/helpers/notifications";

import {
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
} from "../expert_system/constants/constants";

/* eslint-disable no-useless-escape */
const allowedChar = (char) => /[A-Z()!\+\|\^\ <=>]/.test(char);

const countChar = (str, regex) => str.replace(new RegExp(regex, "g"), "").length;

const ruleStructure = (str) => str && /^[A-Z()!\+\|\^\ ]+(=>|<=>)[A-Z()!\+\|\^\ ]+$/.test(str);

const validateStructure = (row, ruleErrors, rulesArrayErrors, ruleIndex) => {
  if (!ruleStructure(row)) {
    const ruleChars = row.split("");
    const notAllowedChars = ruleChars.filter((char) => !allowedChar(char));
    const uniqueNotAllowedChars = [...new Set(notAllowedChars)];
    if (uniqueNotAllowedChars.length > 0) {
      ruleErrors.row = errorMessages(NOT_ALLOWED_CHAR, uniqueNotAllowedChars.join(""));
    } else {
      ruleErrors.row = errorMessages(BAD_RULE_FORMATTING, uniqueNotAllowedChars.join(""));
    }
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
};

const validateBrackets = (row, ruleErrors, rulesArrayErrors, ruleIndex) => {
  const tempRow = row.replace(/(=>|<=>)/, "@");
  const ruleParts = tempRow.split("@");
  ruleParts.forEach((part, index) => {
    if (countChar(part, /[^(]/) > countChar(part, /[^)]/)) {
      ruleErrors.row = errorMessages(BAD_SYMBOL_NUMBER, `'(' in ${index === 0 ? "left" : "right"} part of the rule`);
      rulesArrayErrors[ruleIndex] = ruleErrors;
    }
    if (countChar(part, /[^(]/) < countChar(part, /[^)]/)) {
      ruleErrors.row = errorMessages(BAD_SYMBOL_NUMBER, `')' in ${index === 0 ? "left" : "right"} part of the rule`);
      rulesArrayErrors[ruleIndex] = ruleErrors;
    }
  });
};

const checkLetters = (row, ruleErrors, rulesArrayErrors, ruleIndex) => {
  if (/[A-Z]\ *[A-Z]/g.test(row)) {
    ruleErrors.row = errorMessages(MULTIPLE_LETTERS);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/[A-Z]\ *\(/g.test(row)) {
    ruleErrors.row = errorMessages(LETTER_AND_BRACKET);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/\) *[A-Z]/g.test(row)) {
    ruleErrors.row = errorMessages(BRACKET_AND_LETTER);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/^\ *[+\|\^]\ *[A-Z]/g.test(row)) {
    ruleErrors.row = errorMessages(RULE_START_WITH_SIGN);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/[A-Z]\ *[!\+\|\^]\ *$/g.test(row)) {
    ruleErrors.row = errorMessages(RULE_END_WITH_SIGN);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
};

const checkSymbols = (row, ruleErrors, rulesArrayErrors, ruleIndex) => {
  if (/! +[A-Z]/g.test(row)) {
    ruleErrors.row = errorMessages(NO_SPACE_AFTER_SIGN);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/[A-Z]\ *![A-Z]/g.test(row)) {
    ruleErrors.row = errorMessages(NO_SIGN_BEFORE_EXCLAMATION);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/[!\+\|\^]\ *=|=[!\+\|\^\ ]/g.test(row)) {
    ruleErrors.row = errorMessages(BAD_OPERATION);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  const trimmedRow = row.split(" ").join("");
  if (/[!\+\|\^][+\|\^]/g.test(trimmedRow)) {
    ruleErrors.row = errorMessages(MULTIPLE_SIGNS);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/!!/g.test(trimmedRow)) {
    ruleErrors.row = errorMessages(MULTIPLE_EXCLAMATION);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/\)\(/g.test(trimmedRow)) {
    ruleErrors.row = errorMessages(BAD_BRACKETS_POSITION, "')('");
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/\(\)/g.test(trimmedRow)) {
    ruleErrors.row = errorMessages(BAD_BRACKETS_POSITION, "'()'");
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
  if (/!\(|\)!/g.test(trimmedRow)) {
    ruleErrors.row = errorMessages(EXCLAMATION_WITH_BRACKETS);
    rulesArrayErrors[ruleIndex] = ruleErrors;
  }
};
/* eslint-enable no-useless-escape */

const validateExpertSystemForm = (values) => {
  const errors = {};
  if (!values.queries) {
    errors.queries = "Required";
  } else {
    const queries = values.queries.split("");
    queries.forEach((query) => {
      let queryFound = false;
      values.rules.forEach((rule) => {
        if (rule && rule.row && rule.row.indexOf(query) >= 0) {
          queryFound = true;
        }
      });
      if (!queryFound) {
        errors.queries = errorMessages(NO_QUERY_IN_RULE, `'${query}'`);
      }
    });
  }
  const rulesArrayErrors = [];
  if (values.rules && values.rules.length) {
    values.rules.forEach((rule, ruleIndex) => {
      const ruleErrors = {};
      if (!rule || !rule.row) {
        ruleErrors.row = "Required";
        rulesArrayErrors[ruleIndex] = ruleErrors;
      }
      if (rule && rule.row) {
        validateStructure(rule.row, ruleErrors, rulesArrayErrors, ruleIndex);
        validateBrackets(rule.row, ruleErrors, rulesArrayErrors, ruleIndex);
        checkLetters(rule.row, ruleErrors, rulesArrayErrors, ruleIndex);
        checkSymbols(rule.row, ruleErrors, rulesArrayErrors, ruleIndex);
      }
    });
    if (rulesArrayErrors.length) {
      errors.rules = rulesArrayErrors;
    }
  }
  return errors;
};

export {
  validateExpertSystemForm,
};
