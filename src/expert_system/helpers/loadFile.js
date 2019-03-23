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
    let facts = {};
    let queries = {};

    state.forEach((row) => {
      if (row[0] !== "=" && row[0] !== "?") {
        rules.push({row});
      } else if (row[0] === "=") {
        facts.row = row.substring(1);
        const chars = facts.row.split("");
        chars.forEach((char) => facts[char] = true);
      } else if (row[0] === "?") {
        queries.row = row.substring(1);
        const chars = queries.row.split("");
        chars.forEach((char) => queries[char] = null);
      }
    });

    return {
      rules,
      facts,
      queries,
    };
  } else {
    error(FILE_NOT_EXIST, filename);
    process.exit(0);
  }
};

export {
  loadFile,
};