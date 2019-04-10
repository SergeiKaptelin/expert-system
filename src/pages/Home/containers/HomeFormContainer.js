import {connect} from "react-redux";
import {formValueSelector} from "redux-form";

import {solveExpertSystemAction, clearResultAction} from "../../../actions/ExpertSystemAction";

import HomeForm from "../components/HomeForm";

export default connect((state) => {
  return {
    solvedData: state.expertSystem.solvedData,
    currentRules: formValueSelector("expertSystemForm")(state, "rules"),
  };
}, {
  solveExpertSystemAction,
  clearResultAction,
})(HomeForm);
