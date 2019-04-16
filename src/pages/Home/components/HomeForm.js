import React, {Component} from "react";
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm, arrayPush} from "redux-form";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import Panel from "../../../components/Panel/Panel";
import TextField from "../../../components/TextField/TextField";
import Info from "./Info";
import RuleFields from "./RuleFields";

import {validateExpertSystemForm} from "../../../utils/formUtils";

import styles from "./HomeForm.scss";

class HomeForm extends Component {
  componentDidMount() {
    const {initialize} = this.props;
    initialize({
      facts: "BC",
      queries: "E",
      rules: [
        {row: "A | B + C => E"},
        {row: "(F | G) + H => E"},
      ]
    });
  }

  handleAddCard = () => {
    const {dispatch, clearResultAction} = this.props;
    clearResultAction()
      .then(dispatch(arrayPush('expertSystemForm', 'rules', {})));
  };

  onlyUppercase = (value, previousValue) => {
      if (value.length === 0) {
        return value;
      }
    return value && /([a-z]|[A-Z])/.test(value[value.length - 1]) ? value.toUpperCase() : previousValue;
  };

  drawResult = (result) => {
    let resultNodes = [];
    let i = 0;
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        resultNodes.push((
          <span key={i} className={styles.ResultItem}>
            {`${key} = ${result[key]}`}
          </span>
        ));
        i++;
      }
    }
    return resultNodes;
  };

  render() {
    const {handleSubmit, submitting, solveExpertSystemAction, solvedData, currentRules, clearResultAction} = this.props;
    const solvedDataPresents = Object.entries(solvedData).length !== 0;
    return (
      <form
        className={styles.Form}
        onSubmit={handleSubmit((values) => solveExpertSystemAction(values))}
      >
        <Grid container spacing={24}>
          <Grid item md={3}>
            <Grid
              container
              spacing={24}
              direction="column"
            >
              <Grid item xs={12}>
                <Panel>
                  <div className={styles.ConditionBox}>
                    <span className={styles.Symbol}>=</span>
                    <Field
                      component={TextField}
                      type="text"
                      name="facts"
                      label="Facts"
                      normalize={this.onlyUppercase}
                    />
                  </div>
                  <div className={styles.ConditionBox}>
                    <span className={styles.Symbol}>?</span>
                    <Field
                      component={TextField}
                      type="text"
                      name="queries"
                      label="Queries"
                      normalize={this.onlyUppercase}
                    />
                  </div>
                </Panel>
              </Grid>
              <div className={styles.ButtonBox}>
                <Button
                  className={styles.Button}
                  disabled={!solvedDataPresents}
                  onClick={clearResultAction}
                >
                  Clear
                </Button>
                <Button
                  className={styles.Button}
                  type="submit"
                  disabled={submitting || currentRules.length === 0}
                >
                  Result
                </Button>
                <Button
                  className={styles.Button}
                  onClick={() => this.handleAddCard()}
                >
                  Add card
                </Button>
              </div>
              {solvedDataPresents && (
                <Grid item xs={12}>
                  <Panel>
                    <div className={styles.Results}>
                      {this.drawResult(solvedData.result)}
                    </div>
                  </Panel>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Grid
              container
              spacing={24}
              direction="column"
            >
              <FieldArray
                name="rules"
                component={RuleFields}
                solvedData={solvedData}
                clearResultAction={clearResultAction}
              />
            </Grid>
          </Grid>
          <Grid item md={3}>
            <Info/>
          </Grid>
        </Grid>
      </form>
    );
  }
}

HomeForm.propTypes = {
  clearResultAction: PropTypes.func.isRequired,
  currentRules: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  solvedData: PropTypes.object,
  solveExpertSystemAction: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

HomeForm.defaultProps = {
  solvedData: undefined,
  currentRules: [],
};

export default reduxForm({
  form: "expertSystemForm",
  validate: validateExpertSystemForm,
})(HomeForm);
