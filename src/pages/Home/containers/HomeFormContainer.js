import {connect} from "react-redux";

import {solveExpertSystemAction} from "../../../actions/ExpertSystemAction";

import HomeForm from "../components/HomeForm";

export default connect((state) => {
  console.log("data", state.expertSystem.solvedData);
  return {};
}, {
  solveExpertSystemAction,
})(HomeForm);
