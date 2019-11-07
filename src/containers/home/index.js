import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getFavoriteTeams } from "../../Redux/actions/index";
import {
  Typography,
  Grid,
  Switch,
  FormGroup,
  FormControlLabel
} from "@material-ui/core";

// import getPrediction from "../../utils/getPrediction";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";

import FavoriteGame from "./FavoriteGame";
import RegularGame from "./RegularGame";

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
  },
  link: {
    textDecoration: "underline",
    color: "black"
  }
}));

const Home = ({ id, getFavoriteTeams, favoriteTeams }) => {
  const classes = useStyles();
  const [date, setDate] = useState("20190721");
  const [games, setGames] = useState([]);
  const [profile_id, setProfile_id] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axiosWithAuthMSF()
      .get(
        `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/date/${moment(
          date
        ).format("YYYYMMDD")}/games.json`
      )
      .then(res => {
        const gamesContainer = res.data.games.map(game => {
          return {
            awayTeam: game.schedule.awayTeam.abbreviation,
            homeTeam: game.schedule.homeTeam.abbreviation,
            awayScore: game.score.awayScoreTotal,
            homeScore: game.score.homeScoreTotal,
            date: moment(game.schedule.startTime).format("LLL")
          };
        });
        setGames(gamesContainer);
      })
      .catch(err => {
        console.log(err);
      });
  }, [date]);

  // useEffect(() => {
  //   getPrediction(date);
  // }, []);

  useEffect(() => {
    getFavoriteTeams(profile_id);
  }, [profile_id, checked]);

  useEffect(() => {
    setProfile_id(id);
  }, [id]);

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  let filteredSchedule;

  if (favoriteTeams.length > 0 && checked) {
    let container = [];
    for (let i = 0; i < games.length; i++) {
      for (let y = 0; y < favoriteTeams.length; y++) {
        if (
          games[i].awayTeam === favoriteTeams[y].abbreviation ||
          games[i].homeTeam === favoriteTeams[y].abbreviation
        ) {
          container.push(games[i]);
        }
      }
    }
    filteredSchedule = container.map((game, i) => (
      <FavoriteGame game={game} key={`scheduleGame#${i}`} />
    ));
  } else if (favoriteTeams.length == 0 && checked) {
    filteredSchedule = (
      <Typography variant="body1">
        To add favorite teams to track,{" "}
        <Link to="/profile" className={classes.link}>
          go to the Profile Page
        </Link>
      </Typography>
    );
  } else {
    filteredSchedule = games.map((game, i) => (
      <RegularGame game={game} key={`scheduleRegularGame#${i}`} />
    ));
  }

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
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  value="checked"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              }
              label="Toggle View"
            />
          </FormGroup>
        </Grid>
      </MuiPickersUtilsProvider>
      <Grid container justify="center" style={{ margin: "20px auto auto" }}>
        {filteredSchedule}
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.profile_id,
  favoriteTeams: state.favoriteTeams
});

export default connect(
  mapStateToProps,
  { getFavoriteTeams }
)(Home);
