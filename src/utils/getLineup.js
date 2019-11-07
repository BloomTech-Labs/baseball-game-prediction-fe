import { axiosWithAuthMSF } from "./axiosWithAuthMSF";
import { axiosWithAuth } from "./axiosAuth"

export const getLineup = async (date, away, home) => {
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
      return gameLineup;
    }
  };
