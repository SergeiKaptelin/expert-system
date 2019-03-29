// const printSolutions = (solutions) => {
//   solutions.forEach((solution) => {
//     const arr = solution.map((item) => item.value);
//     console.log(arr);
//   });
// };

/* eslint-disable no-loop-func */
const calculate = (query, {rules, facts}) => {
  let result = null;
  const rulesWithQuery = rules.filter((rule) => rule.truthTable.head.includes(query));
  for (const rule of rulesWithQuery) {
    let solutions = rule.truthTable.body;
    const ruleFacts = getRuleFacts(rule, facts);
    for (const key in ruleFacts) {
      if (ruleFacts.hasOwnProperty(key) && ruleFacts[key] !== null) {
        solutions = solutions.filter((solution) => solution.some(({name, value}) => {
          return name === key && value === ruleFacts[key];
        }));
      }
    }
    console.log(rule.truthTable.head);
    // printSolutions(rule.truthTable.body);
    // console.log("last", rule.truthTable.head[rule.truthTable.head.length - 1]);
    // console.log("solutions", solutions);
    if (solutions.length === 1) {
      console.log("in calculate: solutions.length = 1");
      result = solutions[0]
        .find((item) => item.name === query)
        .value;
      break;
    } else if (solutions.length < 1) {
      console.log("in calculate: solutions.length < 1");
      result = "undetermined";
    } else if (solutions.length > 1) {
      console.log("in calculate: solutions.length > 1");
      const match = solutions[0]
        .find((item) => item.name === query)
        .value;
      const answers = solutions.map((solutions) => solutions.find((item) => item.name === query).value);
      if (answers.includes(!match)) {
        result = "undetermined";
      } else {
        result = match;
      }
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
  calculate,
}
