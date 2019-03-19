import React from "react";
import Paper from "@material-ui/core/Paper";

import HomeForm from "./HomeForm";

import styles from "./Home.scss";

const Home = () => {
  return (
    <section className={styles.MainSection}>
      <Paper
        className={styles.Card}
        elevation={1}
      >
        <HomeForm/>
      </Paper>
    </section>
  );
};

export default Home;