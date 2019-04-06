import truthTable from "../core/truth_table";

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

const countAppearance = (value, doubleArr) => {
  const appearancesArr = doubleArr.filter((variables) => variables.indexOf(value) >= 0);
  return appearancesArr.length;
};

const getRules = (expertSystem) => {
  let rules = [];
  rules = expertSystem.rules.map((rule) => parenthesesForConclusion(rule));
  rules = rules.map((rule) => parenthesesForNegation(rule));
  rules = rules.map((rule) => {
    rule.truthTable = truthTable(rule.row);
    return rule;
  });
  return rules;
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
    queries.row.split("").forEach((item) => {
      if (initialFacts.row.indexOf(item) < 0) {
        facts[item] = null;
      }
    });
  }
  return facts;
};

const getQueries = (expertSystem) => {
  const {rules, initialFacts: {row}, initialQueries} = expertSystem;
  let queries = [];
  let possibleQueries = [];
  let allVariables = [];
  let variablesByRule = [];
  rules.forEach((rule) => {
    const variables = rule.row.match(/[A-Z]/g);
    allVariables = [...allVariables, ...variables];
    variablesByRule.push(variables);
  });
  const uniqueAllVariables = [...new Set(allVariables)];
  uniqueAllVariables.forEach((value) => {
    if (countAppearance(value, variablesByRule) > 1 && row.indexOf(value) < 0) {
      possibleQueries.push(value);
    }
  });
  queries = [...initialQueries.row.split(""), ...possibleQueries];
  return {
    row: [...new Set(queries)].join(""),
  };
};

export {
  getRules,
  getFacts,
  getQueries,
};
