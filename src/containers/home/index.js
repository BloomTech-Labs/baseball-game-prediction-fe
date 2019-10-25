import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import { axiosWithAuth } from "../../utils/axiosAuth";
import getLogo from '../../utils/getLogo';

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import moment from "moment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: "75px auto 25px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Home = () => {
  const classes = useStyles();
  const [date, setDate] = useState("20190721");
  const [games, setGames] = useState([]);

  useEffect(() => {
    axiosWithAuthMSF()
      .get(
        `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/date/${moment(
          date
        ).format("YYYYMMDD")}/games.json`
      )
      .then(res => {
        console.log(res.data);
        const gamesContainer = res.data.games.map(game => {
          return {
            awayTeam: game.schedule.awayTeam.abbreviation,
            homeTeam: game.schedule.homeTeam.abbreviation,
            awayScore: game.score.awayScoreTotal,
            homeScore: game.score.homeScoreTotal
          };
        });
        setGames(gamesContainer);
      })
      .catch(err => {
        console.log(err);
      });
  }, [date]);

  const handleDateChange = newDate => {
    console.log(newDate);
    setDate(newDate);
  };

  console.log(games);

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="normal"
            id="date-picker-inline"
            label="Game Date"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid container justify="center" style={{ margin: "20px auto auto" }}>
        {games.map((game, i) => (
          <Grid
            item
            xs={10}
            sm={12}
            key={`scheduleGame#${i}`}
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
        ))}
      </Grid>
    </div>
  );
};

export default Home;
