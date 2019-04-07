import {
  SOLVE_EXPERT_SYSTEM,
  SOLVE_EXPERT_SYSTEM_SUCCESS,
  CLEAR_EXPERT_SYSTEM_RESULT,
} from "../constants/ExpertSystemConstants";

import {deepThought} from "../expert_system/core/algorithm"

const solveExpertSystemAction = (data) => async (dispatch) => {
  const {rules, facts, queries} = data;
  const payload = {
    rules: rules.map(({row}) => ({
      row: row.trim().split(" ").join(""),
    })),
    initialFacts: {
      row: facts,
    },
    initialQueries: {
      row: queries,
    },
  };

  dispatch({
    type: SOLVE_EXPERT_SYSTEM,
  });

  try {
    const solvedData = deepThought(payload);
    dispatch({
      type: SOLVE_EXPERT_SYSTEM_SUCCESS,
      solvedData: solvedData,
    })
  } catch (error) {
    console.log(error);
  }
};

const clearResultAction = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EXPERT_SYSTEM_RESULT,
  });
};

export {
  solveExpertSystemAction,
  clearResultAction,
}