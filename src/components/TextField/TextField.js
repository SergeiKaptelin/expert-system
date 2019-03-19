import React, {Component} from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MaterialInput from "@material-ui/core/Input";

import styles from "./TextField.scss";

class TextField extends Component {
  render() {
    const {endAdornment, id, type, value, onHandleChange, labelClasses, inputClasses} = this.props;

    return (
      <div className={styles.Wrapper}>
        <FormControl
          fullWidth
          className={styles.FormControl}
        >
          <InputLabel
            htmlFor={id}
            classes={labelClasses}
          >
            Before
          </InputLabel>
          <MaterialInput
            endAdornment={endAdornment}
            id={id}
            type={type}
            value={value}
            onChange={onHandleChange()}
            classes={inputClasses}
          />
        </FormControl>
      </div>
    );
  }
}

TextField.propTypes = {
  endAdornment: PropTypes.node,
  id: PropTypes.string,
  inputClasses: PropTypes.object,
  labelClasses: PropTypes.object,
  onHandleChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
};

TextField.defaultProps = {
  endAdornment: null,
  id: null,
  inputClasses: null,
  labelClasses: null,
  onHandleChange: () => false,
  type: "text",
  value: "",
};

export default TextField;
