import loadFile from "./loadFile";
import truthTable from "../core/truth_table";

const getRules = (filename) => {
  const expertSystem = loadFile(filename);
  expertSystem.rules = expertSystem.rules.map((rule) => parenthesesForConclusion(rule));
  expertSystem.rules = expertSystem.rules.map((rule) => parenthesesForNegation(rule));
  expertSystem.rules.forEach((rule) => rule.truthTable = truthTable(rule.row));
  return expertSystem;
};

const getFacts = ({rules, initialFacts, queries}) => {
  let facts = {};
  rules.forEach((rule) => {
    rule.truthTable.head.forEach((item) => {
      if (item.length === 1 && !facts[item]) {
        facts[item] = false;
      }
    });
  });
  if (initialFacts.row.length > 0) {
    initialFacts.row.split("").forEach((item) => facts[item] = true);
  }
  if (queries.row.length > 0) {
    queries.row.split("").forEach((item) => facts[item] = null);
  }
  return facts;
};

const parenthesesForConclusion = (rule) => {
  const {row} = rule;
  const match = row.match(/<->|<=>|->|=>/g);
  const separator = match ? match[0] : "";
  const equations = row.split(separator);
  return {
    ...rule,
    row: `${equations[0]}${separator}(${equations[1]})`,
  };
};

const parenthesesForNegation = (rule) => {
  const {row} = rule;
  const match = row.match(/![A-Z]/g);
  const uniqueMatch = [...new Set(match)];
  let newRow = row;
  uniqueMatch.forEach((separator) => newRow = newRow.replace(new RegExp(separator, "g"), `(${separator})`));
  return {
    ...rule,
    row: newRow,
  };
};

export {
  getRules,
  getFacts,
};
