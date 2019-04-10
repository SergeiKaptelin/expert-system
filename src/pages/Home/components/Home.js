import React, {Fragment} from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import className from "classnames";

import HomeFormContainer from "../containers/HomeFormContainer";

import styles from "./Home.scss";

const Home = () => {
  return (
    <Fragment>
      <header className={styles.Header}>
        <Tooltip
          title="Source"
          placement="bottom"
        >
          <a
            className={styles.Source}
            href="https://github.com/SergeiKaptelin/expert-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={className("icon-github", styles.GithubIcon)}/>
          </a>
        </Tooltip>
        <div className={styles.Avatar}>
          <Typography variant="button">
            SK
          </Typography>
        </div>
      </header>
      <section className={styles.MainSection}>
        <HomeFormContainer/>
      </section>
    </Fragment>
  );
};

export default Home;