import React, {Component} from "react";
import {reduxForm} from "redux-form";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from "@material-ui/core/IconButton/IconButton";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";

import TextField from "../../../components/TextField/TextField";

import styles from "./HomeForm.scss";

const customStyles = () => ({
  cssFocused: {},
  cssLabel: {
    "&$cssFocused": {
      color: "#377185",
    },
  },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "#377185",
    },
  },
});

class HomeForm extends Component {
  state = {
    showPassword: false,
    password: "",
  };

  handleChange = () => (event) => {
    this.setState({password: event.target.value});
  };

  handleShowPassword = () => {
    this.setState((state) => ({showPassword: !state.showPassword}));
  };

  drawIcon = () => {
    const {showPassword} = this.state;
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="Toggle password visibility"
          onClick={this.handleShowPassword}
        >
          <i
            className={classNames({
              "icon-eye-close": showPassword,
              "icon-eye": !showPassword,
            })}
          />
        </IconButton>
      </InputAdornment>
    );
  };

  render() {
    const {showPassword, password} = this.state;
    const {classes} = this.props;

    return (
      <form className={styles.Form}>
        <Typography
          className={styles.Heading}
          variant="h3"
          gutterBottom
        >
          Encryption
        </Typography>
        <TextField
          endAdornment={this.drawIcon()}
          id="before-password"
          type={showPassword ? "text" : "password"}
          value={password}
          onHandleChange={this.handleChange}
          labelClasses={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
          inputClasses={{
            root: classes.cssUnderline,
          }}
        />
      </form>
    );
  }
}

export default withStyles(customStyles)(reduxForm({
  form: "encryptionForm",
})(HomeForm));
