import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const DateSelector = () => {
  const [games, setGames] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/api/games/date/2019-05-03").then(res => {
      setGames(res.data);
    });
  }, []);

  console.log(games);

  return <div></div>;
};

export default DateSelector;
