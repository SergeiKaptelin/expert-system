import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Field, FieldArray, reduxForm, arrayPush} from "redux-form";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import Panel from "../../../components/Panel/Panel";
import TextField from "../../../components/TextField/TextField";

import styles from "./HomeForm.scss";

class HomeForm extends Component {
  componentDidMount() {
    const {initialize} = this.props;
    initialize({
      facts: "DE",
      queries: "A",
      rules: [
        {row: "B => A"},
        {row: "D + E => B"},
      ]
    });
  }

  uppercase = (value) => value && value.toUpperCase();

  renderRules = ({fields}) => {
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
              </Grid>
            </Panel>
          </Grid>
        ))}
      </Fragment>
    );
  };

  render() {
    const {handleSubmit, submitting, dispatch, solveExpertSystemAction} = this.props;
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
                  onClick={() => dispatch(arrayPush('expertSystemForm', 'rules', {}))}
                >
                  Add card
                </Button>
              </div>
              <Grid item xs={12}>
                <Panel>
                  Panel 2
                </Panel>
              </Grid>
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
                component={this.renderRules}
              />
            </Grid>
          </Grid>
          <Grid item md={3}>
            Right
          </Grid>
        </Grid>
      </form>
    );
  }
}

HomeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  solveExpertSystemAction: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: "expertSystemForm",
})(HomeForm);
