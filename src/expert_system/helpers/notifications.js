import colors from "colors";

import {FILE_NOT_EXIST} from "../constants/constants";

/* eslint-disable default-case*/
const errorMessages = (key, message) => {
  switch (key) {
    case FILE_NOT_EXIST:
      return `File ${message.yellow} not exist`;
  }
};
/* eslint-enable default-case*/

const error = (key, message = "") => {
  const errorMessage = errorMessages(key, message);
  console.log(colors.red("ERROR!"), errorMessage);
};

const usage = () => {
  console.log(colors.yellow("Usage: ./expert_system filename"));
  console.log(colors.yellow("   filename - path to file with rules"));
  process.exit(0);
};

export {
  usage,
  error,
};