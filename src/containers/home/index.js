import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: 500,
    margin: "50px auto auto"
  }
});

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom align="center">
        Welcome to the Baseball Game Prediction App!
      </Typography>
      <Typography variant="body1" gutterBottom align="center">
        Please login or register
      </Typography>
    </div>
  );
};

export default Home;
