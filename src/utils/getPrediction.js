import moment from "moment";
import { axiosWithAuthMSF } from "./axiosWithAuthMSF";

const getPrediction = async () => {
  let variable1 = await axiosWithAuthMSF().get(
    "https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/team_gamelogs.json"
  );
};

export default getPrediction;

// 1 - https://api.mysportsfeeds.com/v2.1/pull/mlb/{season}/date/{date}/games.{format}

// 2 - https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games/{game}/lineup.json

//   const gameData = {
//     date: 1,
//     game_num: "",
//     day_of_week: 1,
//     visiting_team: 1,
//     visiting_team_league: "",
//     visiting_game_num: "",
//     home_team: 1,
//     home_team_league: "",
//     home_team_game_num: "",
//     day_night: 1,
//     park_id: 1,
//     visiting_manager_name: "",
//     home_manager_name: "",
//     visiting_starting_pitcher_name: 2,
//     home_starting_pitcher_name: 2,
//     visiting_1_name: 2,
//     visiting_1_pos: 2,
//     visiting_2_name: 2,
//     visiting_2_pos: 2,
//     visiting_3_name: 2,
//     visiting_3_pos: 2,
//     visiting_4_name: 2,
//     visiting_4_pos: 2,
//     visiting_5_name: 2,
//     visiting_5_pos: 2,
//     visiting_6_name: 2,
//     visiting_6_pos: 2,
//     visiting_7_name: 2,
//     visiting_7_pos: 2,
//     visiting_8_name: 2,
//     visiting_8_pos: 2,
//     visiting_9_name: 2,
//     visiting_9_pos: 2,
//     home_1_name: 2,
//     home_1_pos: 2,
//     home_2_name: 2,
//     home_2_pos: 2,
//     home_3_name: 2,
//     home_3_pos: 2,
//     home_4_name: 2,
//     home_4_pos: 2,
//     home_5_name: 2,
//     home_5_pos: 2,
//     home_6_name: 2,
//     home_6_pos: 2,
//     home_7_name: 2,
//     home_7_pos: 2,
//     home_8_name: 2,
//     home_8_pos: 2,
//     home_9_name: 2,
//     home_9_pos: 2
//   };
