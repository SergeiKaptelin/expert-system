import {loadFile} from "./helpers/loadFile";
import {usage} from "./helpers/notifications";

const {argv} = process;
if (argv.length !== 3) {
  usage();
}

const expertSystem = loadFile(argv[2]);
console.log(expertSystem);
