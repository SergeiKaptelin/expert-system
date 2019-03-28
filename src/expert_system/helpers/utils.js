import loadFile from "./loadFile";
import truthTable from "../core/truth_table";

const getRules = (filename) => {
  const expertSystem = loadFile(filename);
  expertSystem.rules = addParentheses(expertSystem.rules);
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

const addParentheses = (rules) => {
  let newRules = [];
  rules.forEach(({row}) => {
    const match = row.match(/<->|<=>|iff|IFF|->|=>|if|IF/g);
    const separator = match ? match[0] : "";
    const equations = row.split(separator);
    newRules.push({
      row: `${equations[0]}${separator}(${equations[1]})`,
    });
  });
  return newRules;
};

export {
  getRules,
  getFacts,
};
