import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import moment from "moment";

const DateSelector = () => {
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/games/date/${moment(selectedDate).format(
          "YYYY-MM-DD"
        )}`
      )
      .then(res => {
        setGames(res.data);
      });
  }, [selectedDate]);

  let schedule = <div />;

  if (games.length > 0) {
    schedule = (
      <ul>
        {games.map(game => (
          <li>{game.score}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/DD/YYYY"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div>{schedule}</div>
    </div>
  );
};

export default DateSelector;
