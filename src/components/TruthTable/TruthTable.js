import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/Grid";
import classNames from "classnames";

import styles from "./TruthTable.scss";

const TruthTable = ({rule, query}) => {
  const isRowInSolutions = (row) => {
    if (rule.possibleSolutions) {
      const possibleSolution = rule.possibleSolutions.find((item) => item.query === query);
      if (possibleSolution) {
        return possibleSolution.solutions.some((solution) => JSON.stringify(solution) === JSON.stringify(row));
      }
    }
    return false;
  };

  return (
    <div className={styles.Table}>
      <Grid
        container
        spacing={8}
        className={styles.Hr}
      >
        {rule.truthTable.head.map((item, index) => (
          <Grid
            item
            xs
            className={styles.Th}
            key={index}
          >
            <span>{item}</span>
          </Grid>
        ))}
      </Grid>
      {rule.truthTable.body.map((row, index) => (
        <Grid
          container
          spacing={8}
          className={styles.Tr}
          key={index}
        >
          {row.map((item, index) => (
            <Grid
              key={`item-${index}`}
              item
              xs
              className={classNames(styles.Td, {
                [styles.TrueCellDefault]: item.value,
                [styles.FalseCellDefault]: !item.value,
                [styles.TrueCellSolution]: isRowInSolutions(row) && item.value,
                [styles.FalseCellSolution]: isRowInSolutions(row) && !item.value,
              })}
            >
              <span>
                {item.value ? "true" : "false"}
              </span>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
};

TruthTable.propTypes = {
  rule: PropTypes.object,
  query: PropTypes.string,
};

TruthTable.defaultProps = {
  rule: {},
  query: "",
};

export default TruthTable;
