import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getFavoriteTeams,
  getHomepageGamedata
} from "../../Redux/actions/index";
import {
  Typography,
  Grid,
  Switch,
  FormGroup,
  FormControlLabel,
  CircularProgress
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import FavoriteGame from "./FavoriteGame";
import RegularGame from "./RegularGame";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

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
  },
  circleProgress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const Home = ({
  id,
  getFavoriteTeams,
  favoriteTeams,
  homepageGamedataLoading,
  getHomepageGamedata,
  homepageGamedata,
  homepageGamedataError
}) => {
  const classes = useStyles();
  const [date, setDate] = useState("20190721");
  const [profile_id, setProfile_id] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getHomepageGamedata(date);
  }, [date]);

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
    for (let i = 0; i < homepageGamedata.length; i++) {
      for (let y = 0; y < favoriteTeams.length; y++) {
        if (
          homepageGamedata[i].awayTeam === favoriteTeams[y].abbreviation ||
          homepageGamedata[i].homeTeam === favoriteTeams[y].abbreviation
        ) {
          container.push(homepageGamedata[i]);
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
    filteredSchedule = homepageGamedata.map((game, i) => (
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
      {homepageGamedataLoading ? (
        <div className={classes.circleProgress}>
          <CircularProgress
            size={50}
            thickness={2}
            style={{ margin: "75px auto" }}
          />
        </div>
      ) : homepageGamedataError ? (
        <Typography>
          There was an issue loading the schedule. Please try again later .
        </Typography>
      ) : (
        <Grid container justify="center" style={{ margin: "20px auto auto" }}>
          {filteredSchedule}
        </Grid>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  id: state.profile_id,
  favoriteTeams: state.favoriteTeams,
  homepageGamedataLoading: state.homepageGamedataLoading,
  homepageGamedata: state.homepageGamedata,
  homepageGamedataError: state.homepageGamedataError
});

export default connect(
  mapStateToProps,
  { getFavoriteTeams, getHomepageGamedata }
)(Home);
