// Render Prop
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  register,
  clearErrors,
  passwordMismatch
} from "../../Redux/actions/index";
import { Link } from "react-router-dom";
import "../formstyle/index.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: 350,
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  text: {
    width: "100%",
    maxWidth: 500,
    margin: "auto"
  }
}));

const RegisterForm = ({ register, clearErrors, passwordMismatch, history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confPassword: ""
  });

  useEffect(() => {
    clearErrors();
  }, []);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (values.password === values.confPassword) {
      const user = {
        username: values.username,
        password: values.password
      };
      const redirect = () => history.push("/login");
      register(user, redirect);
    } else {
      passwordMismatch();
    }
  };

  return (
    <div className="RegisterForm">
      <div className={classes.text}>
        <Typography variant="h4" gutterBottom align="center">
          Create Account
        </Typography>
      </div>
      <form
        onSubmit={e => this.handleSubmit(e)}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="username"
          label="Username"
          className={classes.textField}
          value={values.username}
          onChange={handleChange("username")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="confPassword"
          label="Confirm Password"
          type="password"
          className={classes.textField}
          value={values.confPassword}
          onChange={handleChange("confPassword")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className={classes.button}
          onClick={e => handleSubmit(e)}
        >
          Create Account
        </Button>
        <br />
        <div className={classes.text}>
          <Typography variant="body1" gutterBottom align="center">
            Already have a account? <Link to="/login">Login</Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    usernameExistsError: state.usernameExistsError,
    passwordMismatchError: state.passwordMismatchError
  };
};

export default connect(
  mapStateToProps,
  { register, clearErrors, passwordMismatch }
)(RegisterForm);
