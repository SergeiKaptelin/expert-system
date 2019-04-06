import {SOLVE_EXPERT_SYSTEM, SOLVE_EXPERT_SYSTEM_SUCCESS} from "../constants/ExpertSystemConstants";

const initialState = {
  solvedData: {},
  solving: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SOLVE_EXPERT_SYSTEM:
      return {
        ...state,
        solving: true,
      };
    case SOLVE_EXPERT_SYSTEM_SUCCESS:
      return {
        ...state,
        solving: false,
        solvedData: action.solvedData,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
