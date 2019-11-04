import moment from "moment";
import { axiosWithAuthMSF } from "./axiosWithAuthMSF";
import { axiosWithAuth } from "./axiosAuth"

export function getPrediction(date, away, home) {

  const getLineup = async () => {
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

      return gameInfo
    
    } else {
      console.log(gameLineup);
    }
  };

  getLineup()
  .then(res => {
    if(res.game && res.teams){
      // Sorting out/formatting variables
      const gameTime = moment(res.game.startTime).format("HH");
      const dayNight = () => {
        const hour = parseInt(gameTime);
        if(hour >= 17) {
          return "N"
        } else {
          return "D"
        }
      };
      const gamedate = res.game.startTime;
      const dayofweek = moment(gamedate).format('ddd');

      console.log(res, gameTime);
      const gameData = {
        date: date,
        game_num: "3",
        day_of_week: dayofweek,
        visiting_team: res.game.awayTeam.abbreviation,
        visiting_team_league: `${res.teams[0].data[0].league} ${res.teams[0].data[0].division}`,
        visiting_game_num: "1",
        home_team: res.game.homeTeam.abbreviation,
        home_team_league: `${res.teams[1].data[0].league} ${res.teams[1].data[0].division}`,
        home_team_game_num: "1",
        day_night: dayNight(),
        park_id: res.game.venue.id,
        visiting_manager_name: "",
        home_manager_name: "",
        visiting_starting_pitcher_name: 2,
        home_starting_pitcher_name: 2,
        visiting_1_name: 2,
        visiting_1_pos: 2,
        visiting_2_name: 2,
        visiting_2_pos: 2,
        visiting_3_name: 2,
        visiting_3_pos: 2,
        visiting_4_name: 2,
        visiting_4_pos: 2,
        visiting_5_name: 2,
        visiting_5_pos: 2,
        visiting_6_name: 2,
        visiting_6_pos: 2,
        visiting_7_name: 2,
        visiting_7_pos: 2,
        visiting_8_name: 2,
        visiting_8_pos: 2,
        visiting_9_name: 2,
        visiting_9_pos: 2,
        home_1_name: 2,
        home_1_pos: 2,
        home_2_name: 2,
        home_2_pos: 2,
        home_3_name: 2,
        home_3_pos: 2,
        home_4_name: 2,
        home_4_pos: 2,
        home_5_name: 2,
        home_5_pos: 2,
        home_6_name: 2,
        home_6_pos: 2,
        home_7_name: 2,
        home_7_pos: 2,
        home_8_name: 2,
        home_8_pos: 2,
        home_9_name: 2,
        home_9_pos: 2
      }
      console.log(gameData);
    } else {
      console.log(res);
    }
  }
  )
}
