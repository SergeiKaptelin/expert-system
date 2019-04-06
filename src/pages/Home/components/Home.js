import React from "react";

import HomeFormContainer from "../containers/HomeFormContainer";

import styles from "./Home.scss";

const Home = () => {
  return (
    <section className={styles.MainSection}>
      <HomeFormContainer/>
    </section>
  );
};

export default Home;