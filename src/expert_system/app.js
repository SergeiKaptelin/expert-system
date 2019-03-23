import loadFile from "./helpers/loadFile";
import {usage} from "./helpers/notifications";
import truthTable from "./core/truth_table";
import {getFacts, calculate} from "./core/algorithm";

const {argv} = process;
if (argv.length !== 3) {
  usage();
}

const expertSystem = loadFile(argv[2]);

expertSystem.rules.forEach((rule) => rule.truthTable = truthTable(rule.row));
expertSystem.facts = getFacts(expertSystem);
let result = {};
expertSystem.queries.row.split("").forEach((query) => {
  const answer = calculate(query, expertSystem);
  expertSystem.facts[query] = answer;
  result[query] = answer;
});
// console.log(expertSystem);
console.log(result);