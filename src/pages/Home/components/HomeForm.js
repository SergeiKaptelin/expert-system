import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm, arrayPush} from "redux-form";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';

import Panel from "../../../components/Panel/Panel";
import TextField from "../../../components/TextField/TextField";
import TruthTable from "../../../components/TruthTable/TruthTable";
import Info from "./Info";

import styles from "./HomeForm.scss";

class HomeForm extends Component {
  state = {
    queriesByRule: [],
  };

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

  componentDidUpdate(prevProps) {
    const {solvedData} = this.props;
    if (Object.entries(solvedData).length !== 0 && JSON.stringify(solvedData) !== JSON.stringify(prevProps.solvedData)) {
      this.setState({
        queriesByRule: solvedData.rules.map((rule) => {
          if (rule.possibleSolutions) {
            return rule.possibleSolutions[0].query;
          }
          return null;
        }),
      });
    }
  }

  handleAddCard = () => {
    const {dispatch, clearResultAction} = this.props;
    clearResultAction()
      .then(dispatch(arrayPush('expertSystemForm', 'rules', {})));
  };

  handleChangeQueryByRule = (query, index) => {
    const {queriesByRule} = this.state;
    let newQueriesByRule = [...queriesByRule];
    newQueriesByRule[index] = query;
    this.setState({
      queriesByRule: newQueriesByRule,
      pressedQuery: query,
    });
  };

  uppercase = (value) => value && value.toUpperCase();

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

  renderRules = (fields) => {
    const {solvedData} = this.props;
    const {queriesByRule} = this.state;
    const solvedDataPresents = Object.entries(solvedData).length !== 0;
    return (
      <Fragment>
        {fields.map((rule, index) => (
          <Grid
            item
            md={12}
            key={index}
          >
            <Panel
              hovered
              handleClose={() => fields.remove(index)}
            >
              <Grid container spacing={24}>
                <Grid item md={4}>
                  <Field
                    component={TextField}
                    id={`row-input-${index}`}
                    type="text"
                    name={`${rule}.row`}
                    label="Rule"
                    normalize={this.uppercase}
                  />
                </Grid>
                {solvedDataPresents && (
                  <Grid item md={8}>
                    <div className={styles.TruthTableTitleBox}>
                      <Typography variant="h6">
                        Truth Table
                      </Typography>
                      <div className={styles.QueriesButtonsBox}>
                        {solvedData.rules[index].possibleSolutions && solvedData.rules[index].possibleSolutions.map((item, i) => (
                          <Button
                            key={i}
                            className={styles.ButtonCircle}
                            onClick={() => this.handleChangeQueryByRule(item.query, index)}
                          >
                            {item.query}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <TruthTable
                      rule={solvedData.rules[index]}
                      query={queriesByRule[index]}
                    />
                  </Grid>
                )}
              </Grid>
            </Panel>
          </Grid>
        ))}
      </Fragment>
    );
  };

  render() {
    const {handleSubmit, submitting, solveExpertSystemAction, solvedData} = this.props;
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
                      id="facts-input"
                      type="text"
                      name="facts"
                      label="Facts"
                      normalize={this.uppercase}
                    />
                  </div>
                  <div className={styles.ConditionBox}>
                    <span className={styles.Symbol}>?</span>
                    <Field
                      component={TextField}
                      id="queries-input"
                      type="text"
                      name="queries"
                      label="Queries"
                      normalize={this.uppercase}
                    />
                  </div>
                </Panel>
              </Grid>
              <div className={styles.ButtonBox}>
                <Button
                  className={styles.Button}
                  type="submit"
                  disabled={submitting}
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
                component={({fields}) => this.renderRules(fields)}
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
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  solvedData: PropTypes.object,
  solveExpertSystemAction: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

HomeForm.defaultProps = {
  solvedData: undefined,
};

export default reduxForm({
  form: "expertSystemForm",
})(HomeForm);
