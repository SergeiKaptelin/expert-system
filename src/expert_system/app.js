import {usage} from "./helpers/notifications";
import {calculate} from "./core/algorithm";
import {getFacts, getRules} from "./helpers/utils";

const {argv} = process;
if (argv.length !== 3) {
  usage();
}

const expertSystem = getRules(argv[2]);
expertSystem.facts = getFacts(expertSystem);

let result = {};
expertSystem.queries.row.split("").forEach((query) => {
  // console.log(JSON.stringify({query, expertSystem}, null, 4));
  const answer = calculate(query, expertSystem);
  expertSystem.facts[query] = answer;
  result[query] = answer;
});
// console.log(expertSystem);
console.log(result);