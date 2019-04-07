import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Panel.scss";

const Panel = ({hovered, children, handleClose}) => {
  return (
    <div className={classNames(styles.Panel, {[styles.Hovered]: hovered})}>
      <div
        className={styles.ButtonCircle}
        role="button"
        tabIndex={0}
        onClick={handleClose}
      >
        {hovered && (
          <i className={classNames("icon-close", styles.CloseIcon)}/>
        )}
      </div>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.any,
  handleClose: PropTypes.func,
  hovered: PropTypes.bool,
};

Panel.defaultProps = {
  children: undefined,
  handleClose: () => false,
  hovered: false,
};

export default Panel;
