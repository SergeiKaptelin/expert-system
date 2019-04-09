import React, {Component} from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from '@material-ui/core/FormHelperText';

import styles from "./TextField.scss";

class TextField extends Component {
  trimValue = (value) => value.trim();

  render() {
    const {id, type, input, placeholder, label, meta: {error, submitFailed}} = this.props;

    return (
      <div className={styles.Wrapper}>
        <FormControl
          fullWidth
          className={styles.FormControl}
        >
          <InputLabel htmlFor={id}>
            {label}
          </InputLabel>
          <Input
            id={id}
            onChange={input.onChange}
            onBlur={() => input.onChange(this.trimValue(input.value))}
            value={input.value}
            name={input.name}
            type={type}
            placeholder={placeholder}
          />
          {submitFailed && error && (
            <FormHelperText>
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
