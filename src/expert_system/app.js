import colors from "colors";

import {usage} from "./helpers/notifications";
import {deepThought} from "./core/algorithm";
import loadFile from "./helpers/loadFile";

const {argv} = process;
if (argv.length !== 3) {
  usage();
}

const expertSystem = loadFile(argv[2]);
const result = deepThought(expertSystem);

for (const key in result) {
  if (result.hasOwnProperty(key)) {
    if (result[key] === true) {
      console.log(`${key} =`, colors.green(result[key]));
    } else if (result[key] === false) {
      console.log(`${key} =`, colors.red(result[key]));
    } else if (result[key] === "undetermined") {
      console.log(`${key} =`, colors.yellow(result[key]));
    } else {
      console.log(`${key} = ${result[key]}`);
    }
  }
}
