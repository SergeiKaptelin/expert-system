import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {Field} from "redux-form";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import Panel from "../../../components/Panel/Panel";
import TextField from "../../../components/TextField/TextField";
import TruthTable from "../../../components/TruthTable/TruthTable";

import styles from "./RuleFields.scss";

const uppercase = (value) => value && value.toUpperCase();

class RuleFields extends Component {
  state = {
    queriesByRule: [],
  };

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

  handleCloseCard = (fields, index) => {
    const {clearResultAction} = this.props;
    clearResultAction();
    fields.remove(index);
  };

  render() {
    const {solvedData, fields} = this.props;
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
              handleClose={() => this.handleCloseCard(fields, index)}
            >
              <Grid container spacing={24}>
                <Grid item md={4}>
                  <Field
                    component={TextField}
                    type="text"
                    name={`${rule}.row`}
                    label="Rule"
                    normalize={uppercase}
                  />
                </Grid>
                {solvedDataPresents && (
                  <Grid item md={8}>
                    <div className={styles.TruthTableTitleBox}>
                      <Typography variant="h6">
                        Truth Table
                      </Typography>
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
  }
}

RuleFields.propTypes = {
  clearResultAction: PropTypes.func.isRequired,
  fields: PropTypes.object,
  solvedData: PropTypes.object,
};

RuleFields.defaultProps = {
  fields: {},
  solvedData: {},
};

export default RuleFields;
