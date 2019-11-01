import moment from "moment";
import { axiosWithAuthMSF } from "./axiosWithAuthMSF";
import { axiosWithAuth } from "./axiosAuth"

export function getPrediction(date, away, home) {

  console.log(date, away, home);

  const getLineup = async () => {
    console.log(date, away, home);
    const gameLineup = await axiosWithAuthMSF().get(
      `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games/${date}-${away}-${home}/lineup.json`
    );
    if(gameLineup.data) {
      const team1 = axiosWithAuth().post(
        `/api/teams/abbr`, { abbreviation: away }
      );
      const team2 = axiosWithAuth().post(
        `/api/teams/abbr`, { abbreviation: home }
      );
      
      const teamArray = await Promise.all([team1, team2])

      const gameInfo = {
        ...gameLineup.data,
        teams: teamArray
      };

      console.log(gameInfo);

      return gameInfo
    
    } else {
      console.log(gameLineup);
    }
  };

  getLineup()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })

  // getLineup(date, away, home)
  // .then(res => {
  //   if(res.data){

  //     const gameData = {
  //       date: date,
  //       game_num: "1",
  //       day_of_week: moment().day(date),
  //       visiting_team: res.data.game.awayTeam.abbreviation,
  //       visiting_team_league: "",
  //       visiting_game_num: "",
  //       home_team: 1,
  //       home_team_league: "",
  //       home_team_game_num: "",
  //       day_night: 1,
  //       park_id: 1,
  //       visiting_manager_name: "",
  //       home_manager_name: "",
  //       visiting_starting_pitcher_name: 2,
  //       home_starting_pitcher_name: 2,
  //       visiting_1_name: 2,
  //       visiting_1_pos: 2,
  //       visiting_2_name: 2,
  //       visiting_2_pos: 2,
  //       visiting_3_name: 2,
  //       visiting_3_pos: 2,
  //       visiting_4_name: 2,
  //       visiting_4_pos: 2,
  //       visiting_5_name: 2,
  //       visiting_5_pos: 2,
  //       visiting_6_name: 2,
  //       visiting_6_pos: 2,
  //       visiting_7_name: 2,
  //       visiting_7_pos: 2,
  //       visiting_8_name: 2,
  //       visiting_8_pos: 2,
  //       visiting_9_name: 2,
  //       visiting_9_pos: 2,
  //       home_1_name: 2,
  //       home_1_pos: 2,
  //       home_2_name: 2,
  //       home_2_pos: 2,
  //       home_3_name: 2,
  //       home_3_pos: 2,
  //       home_4_name: 2,
  //       home_4_pos: 2,
  //       home_5_name: 2,
  //       home_5_pos: 2,
  //       home_6_name: 2,
  //       home_6_pos: 2,
  //       home_7_name: 2,
  //       home_7_pos: 2,
  //       home_8_name: 2,
  //       home_8_pos: 2,
  //       home_9_name: 2,
  //       home_9_pos: 2
  //     }
  //   } else {
  //     console.log(res);
  //   }
  // }
  // )
}
