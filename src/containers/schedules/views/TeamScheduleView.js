import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuthMSF } from "../../../utils/axiosWithAuthMSF";
import GameCard from "../components/GameCard";
import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";

//CSS
import "../../../App.css";

export default function TeamScheduleView(props) {
  const [games, setGames] = useState([]);
  const [startDate, setStartDate] = useState("20190721");
  const [endDate, setEndDate] = useState("20190728");

  useEffect(() => {
    fetchCurrentTeamSchedule();
  }, [startDate, endDate]);

  const fetchCurrentTeamSchedule = async () => {
    let res = await axios.get(
      `https://bgp-be-staging.herokuapp.com/api/teams/${props.match.params.team_id}`
    );
    axiosWithAuthMSF()
      .get(
        `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games.json?team=${res.data[0].abbreviation.toLowerCase()}&date=from-${startDate}-to-${endDate}`
      )
      .then(res => {
        setGames(res.data.games);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleStartDateChange = newDate => {
    const newStartDate = moment(newDate._d).format("YYYYMMDD");
    setStartDate(newStartDate);
  };

  const handleEndDateChange = newDate => {
    const newEndDate = moment(newDate._d).format("YYYYMMDD");
    setEndDate(newEndDate);
  };

  if (games.length > 1) {
    return (
      <div className="teamview-container" style={{ marginTop: "75px" }}>
        <div className="datepicker-container">
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="start-date-picker-inline"
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change start date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="end-date-picker-inline"
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change end date"
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        {games.map(game => {
          return (
            <GameCard
              away_team={game.schedule.awayTeam.abbreviation}
              home_team={game.schedule.homeTeam.abbreviation}
              away_score={game.score.awayScoreTotal}
              home_score={game.score.homeScoreTotal}
              date={moment(game.schedule.startTime).format("LLL")}
              key={game.schedule.id}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="datepicker-container">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="normal"
            id="start-date-picker-inline"
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change start date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="normal"
            id="end-date-picker-inline"
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change end date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}
