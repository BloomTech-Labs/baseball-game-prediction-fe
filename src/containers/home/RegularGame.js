import React from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import getLogo from "../../utils/getLogo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const RegularGame = ({ game, i }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={10}
      sm={12}
      key={`RegularScheduleGame#${i}`}
      style={{ paddingBottom: 12 }}
    >
      <Paper className={classes.paper} elevation={5}>
        <Grid container>
          <Grid
            item
            xs={4}
            style={
              game.homeScore > game.awayScore
                ? {
                    border: "4px solid lightgreen"
                  }
                : null
            }
          >
            <h6 style={{ margin: "5px" }}>Home</h6>
            <img src={getLogo(game.homeTeam)} width="50px" />
          </Grid>
          <Grid item xs={4}>
            <h6 style={{ margin: "5px" }}>Score</h6>
            <Typography variant="h6">{`${game.homeScore} : ${game.awayScore}`}</Typography>
            {/* <h6 style={{ margin: "5px" }}>{game.date}</h6> */}
          </Grid>
          <Grid
            item
            xs={4}
            style={
              game.homeScore < game.awayScore
                ? {
                    border: "4px solid lightgreen"
                  }
                : null
            }
          >
            <h6 style={{ margin: "5px" }}>Away</h6>
            <img src={getLogo(game.awayTeam)} width="50px" />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default RegularGame;
