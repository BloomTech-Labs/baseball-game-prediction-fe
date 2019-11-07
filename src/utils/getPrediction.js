import moment from "moment";
import axios from "axios";

export const getPrediction = async res => {
  if (res.game && res.teams) {
    // Sorting out/formatting variables
    const gameTime = moment(res.game.startTime).format("HH");
    const dayNight = () => {
      const hour = parseInt(gameTime);
      if (hour >= 17) {
        return "N";
      } else {
        return "D";
      }
    };
    const gamedate = res.game.startTime;
    const date = moment(gamedate).format("YYYYMMDD");
    const dayofweek = moment(gamedate).format("ddd");

    // const lineupSorter = () => {
    //   // Gives player objects with batting order as their position
    //   const awayFilteredLineup = res.teamLineups[0].expected.lineupPositions.filter(player => player.position.length > 2);
    //   const homeFilteredLineup = res.teamLineups[1].expected.lineupPositions.filter(player => player.position.length > 2);
    //   // Sorts lineup by batting order
    //   const awaySortedLineup = awayFilteredLineup.sort(function(a, b){
    //     return a.position.charAt(2) - b.position.charAt(2);
    //   });
    //   const homeSortedLineup = homeFilteredLineup.sort(function(a, b){
    //     return a.position.charAt(2) - b.position.charAt(2);
    //   });

    //   return {
    //     awayLineup: awaySortedLineup,
    //     homeLineup: homeSortedLineup
    //   }
    // };

    const gameData = {
      date: date,
      // game_num: "3",
      day_of_week: dayofweek,
      visiting_team: res.game.awayTeam.abbreviation,
      visiting_team_league: `${res.teams[0].data[0].league}`,
      // visiting_game_num: "1",
      home_team: res.game.homeTeam.abbreviation,
      home_team_league: `${res.teams[1].data[0].league}`,
      // home_team_game_num: "1",
      day_night: dayNight(),
      park_id: res.game.venue.id,
      visiting_manager_name: `${res.teams[0].data[0].manager}`,
      home_manager_name: `${res.teams[1].data[0].manager}`
      // visiting_starting_pitcher_name: 2,
      // home_starting_pitcher_name: 2,
      // visiting_1_name: 2,
      // visiting_1_pos: 2,
      // visiting_2_name: 2,
      // visiting_2_pos: 2,
      // visiting_3_name: 2,
      // visiting_3_pos: 2,
      // visiting_4_name: 2,
      // visiting_4_pos: 2,
      // visiting_5_name: 2,
      // visiting_5_pos: 2,
      // visiting_6_name: 2,
      // visiting_6_pos: 2,
      // visiting_7_name: 2,
      // visiting_7_pos: 2,
      // visiting_8_name: 2,
      // visiting_8_pos: 2,
      // visiting_9_name: 2,
      // visiting_9_pos: 2,
      // home_1_name: 2,
      // home_1_pos: 2,
      // home_2_name: 2,
      // home_2_pos: 2,
      // home_3_name: 2,
      // home_3_pos: 2,
      // home_4_name: 2,
      // home_4_pos: 2,
      // home_5_name: 2,
      // home_5_pos: 2,
      // home_6_name: 2,
      // home_6_pos: 2,
      // home_7_name: 2,
      // home_7_pos: 2,
      // home_8_name: 2,
      // home_8_pos: 2,
      // home_9_name: 2,
      // home_9_pos: 2
    };

    console.log("game Data ", gameData);

    const prediction = await axios.post(
      "https://baseball-game-predictor.herokuapp.com/",
      gameData
    );

    return prediction;
  } else {
    return res;
  }
};
