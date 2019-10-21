import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const DateSelector = () => {
  const [games, setGames] = useState([]);

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

  return <div>{schedule}</div>;
};

export default DateSelector;
