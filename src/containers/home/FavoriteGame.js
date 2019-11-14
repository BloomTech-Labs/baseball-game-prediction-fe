import React, { useState } from "react";
import { Typography, Paper, Grid } from "@material-ui/core";
import getLogo from "../../utils/getLogo";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 125
  }
}));

const FavoriteGame = ({ game, i }) => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  return (
    <Grid item xs={10} sm={12} style={{ paddingBottom: 12 }}>
      <Link
        to={`/gamedata/${moment(game.date).format("YYYYMMDD")}/${
          game.awayTeam
        }/${game.homeTeam}`}
        key={`RegularScheduleGame#${i}`}
      >
        <Paper
          className={classes.paper}
          elevation={hover ? 12 : 4}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Grid container>
            <Grid item xs={4}>
              <h6 style={{ margin: "5px" }}>Home</h6>
              <img src={getLogo(game.homeTeam)} width="50px" />
            </Grid>
            <Grid item xs={4}>
              <h6 style={{ margin: "5px" }}>Score</h6>
              <Typography variant="h6">{`${game.homeScore} : ${game.awayScore}`}</Typography>
              {/* <h6 style={{ margin: "5px" }}>{game.date}</h6> */}
            </Grid>
            <Grid item xs={4}>
              <h6 style={{ margin: "5px" }}>Away</h6>
              <img src={getLogo(game.awayTeam)} width="50px" />
            </Grid>
          </Grid>
          {hover && (
            <Typography variant="body2">Click To View Prediction</Typography>
          )}
        </Paper>
      </Link>
    </Grid>
  );
};

export default FavoriteGame;
