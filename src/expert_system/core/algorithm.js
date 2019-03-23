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

/* eslint-disable no-loop-func */
const calculate = (query, {rules, facts}) => {
  let result = null;
  const rulesWithQuery = rules.filter((rule) => rule.truthTable.head.includes(query));
  for (const rule of rulesWithQuery) {
    let solutions = rule.truthTable.body;
    const ruleFacts = getRuleFacts(rule, facts);
    for (const key in ruleFacts) {
      if (ruleFacts.hasOwnProperty(key) && ruleFacts[key]) {
        solutions = solutions.filter((solution) => solution.some(({name, value}) => {
          return name === key && value === ruleFacts[key];
        }));
      }
    }
    console.log(rule.truthTable.head[rule.truthTable.head.length - 1]);
    if (solutions.length === 1) {
      console.log("in calculate: solutions.length = 1");
      result = solutions[0]
        .find((item) => item.name === query)
        .value;
      break;
    } else if (solutions.length < 1) {
      console.log("in calculate: solutions.length < 1");
    } else if (solutions.length > 1) {
      console.log("in calculate: solutions.length > 1");
    }
  }
  console.log("--End Calculate--");
  return result;
};
/* eslint-enable no-loop-func */

const getRuleFacts = (rule, facts) => {
  let ruleFacts = {};
  rule.truthTable.head.forEach((item) => {
    if (item.length === 1) {
      ruleFacts[item] = facts[item];
    }
  });
  return ruleFacts;
};

export {
  getFacts,
  calculate,
}
