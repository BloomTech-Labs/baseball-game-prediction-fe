import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import getLogo from "../../../utils/getLogo";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "100%",
    height: 125
  }
}));

export default function GameCard(props) {
  const classes = useStyles();
  const [hover, setHover] = useState(false);
  return (
    <>
      <Paper
        className={classes.paper}
        elevation={hover ? 12 : 4}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Grid container>
          <Grid item xs={4}>
            <h6 style={{ margin: "5px" }}>Home</h6>
            <img src={getLogo(props.home_team)} width="50px" />
          </Grid>
          <Grid item xs={4}>
            <h6 style={{ margin: "5px" }}>Score</h6>
            <Typography variant="h6">{`${props.home_score} : ${props.away_score}`}</Typography>
            <h6 style={{ margin: "5px" }}>{props.date}</h6>
          </Grid>
          <Grid item xs={4}>
            <h6 style={{ margin: "5px" }}>Away</h6>
            <img src={getLogo(props.away_team)} width="50px" />
          </Grid>
        </Grid>
        {hover && (
          <Typography variant="body2">Click To View Prediction</Typography>
        )}
      </Paper>
    </>
  );
}
