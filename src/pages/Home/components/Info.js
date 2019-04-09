import React from "react";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid/Grid";

import Panel from "../../../components/Panel/Panel";

import {CONJUCTION, DISJUNCTION, NOT, XOR, IMPLICATION, EQUALITY} from "../constants/Operations";

import styles from "./Info.scss";

const Info = () => {
  const drawTable = ({head, body}) => {
    return (
      <div className={styles.Table}>
        <Grid container spacing={8}>
          {head.map((item, index) => (
            <Grid
              item
              xs={index === head.length - 1 ? 6 : true}
              key={index}
            >
              <span>{item}</span>
            </Grid>
          ))}
        </Grid>
        {body.map((row, i) => (
          <Grid container spacing={8} key={i}>
            {row.map((value, j) => (
              <Grid
                item
                xs={j === row.length - 1 ? 6 : true}
                key={j}
              >
                <span>{value}</span>
              </Grid>
            ))}
          </Grid>
        ))}
      </div>
    );
  };

  return (
    <Panel>
      <Typography variant="h6" gutterBottom>
        Operations
      </Typography>
      <Grid container spacing={24}>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Conjunction (AND)
          </Typography>
          {drawTable(CONJUCTION)}
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Disjunction (OR)
          </Typography>
          {drawTable(DISJUNCTION)}
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Negation (NOT)
          </Typography>
          {drawTable(NOT)}
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Exclusive or (XOR)
          </Typography>
          {drawTable(XOR)}
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Implication
          </Typography>
          {drawTable(IMPLICATION)}
        </Grid>
        <Grid item md={6}>
          <Typography variant="subtitle1">
            Equality
          </Typography>
          {drawTable(EQUALITY)}
        </Grid>
      </Grid>
    </Panel>
  );
};

export default Info;
