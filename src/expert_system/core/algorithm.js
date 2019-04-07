import {getFacts, getQueries, getRules} from "../helpers/utils";

const REPEATS = 100;

const getRuleFacts = (rule, facts) => {
  let ruleFacts = {};
  rule.truthTable.head.forEach((item) => {
    if (item.length === 1) {
      ruleFacts[item] = facts[item];
    }
  });
  return ruleFacts;
};

const addSolutions = (rule, query, solutions) => {
  if (!rule.possibleSolutions) {
    rule.possibleSolutions = [];
  }
  const solutionByQuery = rule.possibleSolutions.find((item) => item.query === query);
  if (solutionByQuery) {
    solutionByQuery.solutions = solutions;
  } else {
    rule.possibleSolutions.push({
      query: query,
      solutions: solutions,
    });
  }
};

/* eslint-disable no-loop-func */
const calculate = (query, expertSystem) => {
  const {rules, facts} = expertSystem;
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
    addSolutions(rule, query, solutions);
    if (solutions.length === 1) {
      result = solutions[0]
        .find((item) => item.name === query)
        .value;
      break;
    } else if (solutions.length < 1) {
      result = "undetermined";
    } else if (solutions.length > 1) {
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
  return result;
};
/* eslint-enable no-loop-func */

const refreshFacts = (facts) => {
  const refreshedFacts = {};
  for (const key in facts) {
    if (facts.hasOwnProperty(key)) {
      refreshedFacts[key] = facts[key] === "undetermined" ? null : facts[key];
    }
  }
  return refreshedFacts;
};

const deepThought = (expertSystem) => {
  expertSystem.rules = getRules(expertSystem);
  expertSystem.queries = getQueries(expertSystem);
  expertSystem.facts = getFacts(expertSystem);
  let result = {};
  let facts = Object.values(expertSystem.facts);
  let i = 0;
  while ((facts.indexOf("undetermined") >= 0 || facts.indexOf(null) >= 0) && i < REPEATS) {
    expertSystem.queries.row.split("").forEach((query) => {
      expertSystem.facts = refreshFacts(expertSystem.facts);
      const answer = calculate(query, expertSystem);
      expertSystem.facts[query] = answer;
      if (expertSystem.initialQueries.row.indexOf(query) >= 0) {
        result[query] = answer;
      }
    });
    facts = Object.values(expertSystem.facts);
    i++;
  }
  expertSystem.result = result;
  return expertSystem;
};

export {
  calculate,
  deepThought,
}
