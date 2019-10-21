import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const DateSelector = () => {
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/games/date/2019-05-03").then(res => {
      setGames(res.data);
    });
  }, []);

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
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
