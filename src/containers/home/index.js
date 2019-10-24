import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import { axiosWithAuth } from "../../utils/axiosAuth";

import ARI from "../../logos/ARI.png";
import ATL from "../../logos/ATL.png";
import BAL from "../../logos/BAL.png";
import BOS from "../../logos/BOS.png";
import CHC from "../../logos/CHC.png";
import CIN from "../../logos/CIN.png";
import CLE from "../../logos/CLE.png";
import COL from "../../logos/COL.png";
import CWS from "../../logos/CWS.png";
import DET from "../../logos/DET.png";
import HOU from "../../logos/HOU.png";
import KC from "../../logos/KC.png";
import LAA from "../../logos/LAA.png";
import LAD from "../../logos/LAD.png";
import MIA from "../../logos/MIA.png";
import MIL from "../../logos/MIL.png";
import MIN from "../../logos/MIN.png";
import NYM from "../../logos/NYM.png";
import NYY from "../../logos/NYY.png";
import OAK from "../../logos/OAK.png";
import PHI from "../../logos/PHI.png";
import PIT from "../../logos/PIT.png";
import SD from "../../logos/SD.png";
import SEA from "../../logos/SEA.png";
import SF from "../../logos/SF.png";
import STL from "../../logos/STL.png";
import TB from "../../logos/TB.png";
import TEX from "../../logos/TEX.png";
import TOR from "../../logos/TOR.png";
import WSH from "../../logos/WSH.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: "15px auto"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

const Home = () => {
  const classes = useStyles();
  const [date, setDate] = useState("20190721");
  const [games, setGames] = useState([]);

  useEffect(() => {
    axiosWithAuthMSF()
      .get(
        `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/date/${date}/games.json`
      )
      .then(res => {
        console.log(res.data);
        const gamesContainer = res.data.games.map(game => {
          return {
            awayTeam: game.schedule.awayTeam.abbreviation,
            homeTeam: game.schedule.homeTeam.abbreviation,
            awayScore: game.score.awayScoreTotal,
            homeScore: game.score.homeScoreTotal
          };
        });
        setGames(gamesContainer);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  console.log(games);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {games.map((game, i) => (
          <Grid item xs={12} key={`scheduleGame#${i}`}>
            <Paper className={classes.paper} elevation={5}>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  style={
                    game.homeScore > game.awayScore
                      ? {
                          border: "4px solid lightgreen"
                        }
                      : null
                  }
                >
                  <img src={getLogo(game.homeTeam)} width="50px" />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h6">{`${game.homeScore} : ${game.awayScore}`}</Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={
                    game.homeScore < game.awayScore
                      ? {
                          border: "4px solid lightgreen"
                        }
                      : null
                  }
                >
                  <img src={getLogo(game.awayTeam)} width="50px" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;

const getLogo = team => {
  switch (team) {
    case "ARI":
      return ARI;
    case "ATL":
      return ATL;
    case "BAL":
      return BAL;
    case "BOS":
      return BOS;
    case "CHC":
      return CHC;
    case "CIN":
      return CIN;
    case "CLE":
      return CLE;
    case "COL":
      return COL;
    case "CWS":
      return CWS;
    case "DET":
      return DET;
    case "HOU":
      return HOU;
    case "KC":
      return KC;
    case "LAA":
      return LAA;
    case "LAD":
      return LAD;
    case "MIA":
      return MIA;
    case "MIL":
      return MIL;
    case "MIN":
      return MIN;
    case "NYM":
      return NYM;
    case "NYY":
      return NYY;
    case "OAK":
      return OAK;
    case "PHI":
      return PHI;
    case "PIT":
      return PIT;
    case "SD":
      return SD;
    case "SEA":
      return SEA;
    case "SF":
      return SF;
    case "STL":
      return STL;
    case "TB":
      return TB;
    case "TEX":
      return TEX;
    case "TOR":
      return TOR;
    case "WAS":
      return WSH;
  }
};
