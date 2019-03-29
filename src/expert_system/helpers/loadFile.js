import fs from "fs";

import {error} from "./notifications";

import {FILE_NOT_EXIST} from "../constants/constants";

const loadFile = (filename) => {
  if (fs.existsSync(filename)) {
    const file = fs.readFileSync(filename);
    // validateFile(file);
    const state = file.toString()
      //removing comments
      .replace(/#.+($|\n)/g, "$1")
      .split("\n")
      .map((row) => row.trim().split(" ").join(""))
      .filter((row) => row.length);

    let rules = [];
    let initialFacts = {};
    let initialQueries = {};

    state.forEach((row) => {
      if (row[0] !== "=" && row[0] !== "?") {
        rules.push({row});
      } else if (row[0] === "=") {
        initialFacts.row = row.substring(1);
      } else if (row[0] === "?") {
        initialQueries.row = row.substring(1);
      }
    });

    return {
      rules,
      initialFacts,
      initialQueries,
    };
  } else {
    error(FILE_NOT_EXIST, filename);
    process.exit(0);
  }
};

export default loadFile;