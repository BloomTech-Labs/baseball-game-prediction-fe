import { axiosWithAuthMSF } from "./axiosWithAuthMSF";
import moment from "moment";

const getPrediction = apiData => {
  console.log(apiData);

  const date = moment(apiData.schedule.startTime).format("YYYYMMDD");

  const gameData = {
    date: date,
    game_num: "",
    day_of_week: moment(date).day(),
    visiting_team: "",
    visiting_team_league: "",
    visiting_game_num: "",
    home_team: "",
    home_team_league: "",
    home_team_game_num: "",
    day_night: "",
    park_id: "",
    visiting_manager_name: "",
    home_manager_name: "",
    visiting_starting_pitcher_name: "",
    home_starting_pitcher_name: "",
    visiting_1_name: "",
    visiting_1_pos: "",
    visiting_2_name: "",
    visiting_2_pos: "",
    visiting_3_name: "",
    visiting_3_pos: "",
    visiting_4_name: "",
    visiting_4_pos: "",
    visiting_5_name: "",
    visiting_5_pos: "",
    visiting_6_name: "",
    visiting_6_pos: "",
    visiting_7_name: "",
    visiting_7_pos: "",
    visiting_8_name: "",
    visiting_8_pos: "",
    visiting_9_name: "",
    visiting_9_pos: "",
    home_1_name: "",
    home_1_pos: "",
    home_2_name: "",
    home_2_pos: "",
    home_3_name: "",
    home_3_pos: "",
    home_4_name: "",
    home_4_pos: "",
    home_5_name: "",
    home_5_pos: "",
    home_6_name: "",
    home_6_pos: "",
    home_7_name: "",
    home_7_pos: "",
    home_8_name: "",
    home_8_pos: "",
    home_9_name: "",
    home_9_pos: ""
  };

  console.log("gameData: ", gameData);
};

export default getPrediction;
