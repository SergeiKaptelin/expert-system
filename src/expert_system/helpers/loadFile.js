import fs from "fs";

import {error} from "./notifications";
import {validateFile} from "./validation";

import {
  FILE_NOT_EXIST,
  BAD_FACTS_COUNTER,
  EMPTY_RULES,
  EMPTY_QUERIES,
  BAD_QUERIES_COUNTER,
} from "../constants/constants";

const loadFile = (filename) => {
  if (fs.existsSync(filename)) {
    const file = fs.readFileSync(filename);
    //removing comments
    const state = file.toString()
      .replace(/#.+($|\n)/g, "$1")
      .split("\n")
      .map((row) => row.trim().split(" ").join(""))
      .filter((row) => row.length);

    let rules = [];
    let initialFacts = {};
    let initialQueries = {};
    let factsCounter = 0;
    let queriesCounter = 0;

    state.forEach((row) => {
      if (row[0] !== "=" && row[0] !== "?") {
        rules.push({row});
      } else if (row[0] === "=") {
        initialFacts.row = row.substring(1);
        factsCounter++;
      } else if (row[0] === "?") {
        initialQueries.row = row.substring(1);
        queriesCounter++;
      }
    });

    if (factsCounter === 0) {
      error(EMPTY_RULES)
    } else if (factsCounter > 1) {
      error(BAD_FACTS_COUNTER);
    }

    if (queriesCounter === 0) {
      error(EMPTY_QUERIES)
    } else if (queriesCounter > 1) {
      error(BAD_QUERIES_COUNTER);
    }

    const data = {
      rules,
      initialFacts,
      initialQueries,
    };
    validateFile(data);
    return data;
  } else {
    error(FILE_NOT_EXIST, filename);
  }
};

export default loadFile;