import React, {Component} from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from '@material-ui/core/FormHelperText';
import classNames from "classnames";

import styles from "./TextField.scss";

class TextField extends Component {
  trimValue = (value) => value.trim();

  render() {
    const {id, type, input, placeholder, label, meta} = this.props;
    const {error, submitFailed} = meta;

    return (
      <div className={styles.Wrapper}>
        <FormControl
          fullWidth
          className={styles.FormControl}
        >
          <InputLabel
            htmlFor={id}
            className={classNames({[styles.LabelError]: submitFailed && error})}
          >
            {label}
          </InputLabel>
          <Input
            id={id}
            {...input}
            onBlur={() => input.onChange(this.trimValue(input.value))}
            type={type}
            placeholder={placeholder}
            autoComplete="off"
          />
          {submitFailed && error && (
            <FormHelperText className={styles.HintError}>
              {error}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    );
  }
}

TextField.propTypes = {
  id: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  meta: PropTypes.shape({
    submitFailed: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.node,
    ]),
  }).isRequired,
  type: PropTypes.string,
};

TextField.defaultProps = {
  id: null,
  type: "text",
};

export default TextField;
