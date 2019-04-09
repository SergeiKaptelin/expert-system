import {connect} from "react-redux";

import {solveExpertSystemAction, clearResultAction} from "../../../actions/ExpertSystemAction";

import HomeForm from "../components/HomeForm";

export default connect((state) => {
  return {
    solvedData: state.expertSystem.solvedData,
  };
}, {
  solveExpertSystemAction,
  clearResultAction,
})(HomeForm);
