import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getLineup } from "../../utils/getLineup";
import { getPrediction } from "../../utils/getPrediction";
import moment from "moment";

import getLogo from "../../utils/getLogo";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: 70
  },

  tabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop: 50
  },

  fullContainer: {
    flexFlow: "row nowrap"
  },

  dateTime: {
    marginTop: 20
  },

  circleProgress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

export default function GameData(props) {
  const { date, away, home } = props.match.params;
  const [lineup, setLineup] = useState({});
  const [prediction, setPrediction] = useState({});
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getLineup(date, away, home)
      .then(res => {
        setLineup(res);
        getPrediction(res)
          .then(res => {
            setPrediction(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let gameDisplay;

  while (!lineup.game) {
    return (
      <div className={classes.circleProgress}>
        <CircularProgress
          size={50}
          thickness={2}
          style={{ margin: "200px auto", color: "white" }}
        />
      </div>
    );
  }

  if (lineup.teams && prediction.data) {
    gameDisplay = (
      <div className={classes.fullContainer}>
        <Grid container spacing={3} direction="row" alignItems="center">
          <Grid
            style={{
              background: "rgba(76, 175, 80, 0.45)",
              color: "white"
            }}
            item
            xs={5}
          >
            <Typography align="center">HOME</Typography>
            <img
              src={getLogo(lineup.teams[1].data[0].abbreviation)}
              width="100px"
              style={{ display: "block", margin: "auto" }}
            />
            {prediction.data["Winning team"] ===
            lineup.teams[1].data[0].abbreviation ? (
              <Typography align="center">PREDICTED WINNER</Typography>
            ) : (
              <Typography align="center">PREDICTED LOSER</Typography>
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography align="center">VS</Typography>
          </Grid>
          <Grid
            style={{ background: "rgba(255, 0, 0, 0.45)", color: "white" }}
            item
            xs={5}
          >
            <Typography align="center">AWAY</Typography>
            <img
              src={getLogo(lineup.teams[0].data[0].abbreviation)}
              width="100px"
              style={{ display: "block", margin: "auto" }}
            />
            {prediction.data["Winning team"] ===
            lineup.teams[0].data[0].abbreviation ? (
              <Typography align="center">PREDICTED WINNER</Typography>
            ) : (
              <Typography align="center">PREDICTED LOSER</Typography>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.dateTime}
          justify="center"
          alignItems="center"
        ></Grid>
      </div>
    );
  }

  // Check for lineup data and prediciton
  if (lineup.teamLineups && prediction.data) {
    // Gives an array of player objects with fielding position as their position
    const awayFilteredFieldingLineup =
      lineup.teamLineups[0].expected.lineupPositions.filter(
        player => player.position.length < 3
      ) || null;
    const homeFilteredFieldingLineup =
      lineup.teamLineups[1].expected.lineupPositions.filter(
        player => player.position.length < 3
      ) || null;
    // Gives an array of player objects with batting order as their position
    const awayFilteredBattingLineup =
      lineup.teamLineups[0].expected.lineupPositions.filter(
        player => player.position.length > 2
      ) || null;
    const homeFilteredBattingLineup =
      lineup.teamLineups[1].expected.lineupPositions.filter(
        player => player.position.length > 2
      ) || null;
    // Sorts lineup by fielding position
    const awaySortedFieldingLineup = awayFilteredFieldingLineup.sort();
    const homeSortedFieldingLineup = homeFilteredFieldingLineup.sort();
    // Sorts lineup by batting order
    const awaySortedBattingLineup = awayFilteredBattingLineup.sort(function(
      a,
      b
    ) {
      return a.position.charAt(2) - b.position.charAt(2);
    });
    const homeSortedBattingLineup = homeFilteredBattingLineup.sort(function(
      a,
      b
    ) {
      return a.position.charAt(2) - b.position.charAt(2);
    });

    // Checks for sorted lineups
    if (
      awaySortedBattingLineup &&
      homeSortedBattingLineup &&
      awaySortedFieldingLineup &&
      homeSortedFieldingLineup
    ) {
      return (
        <div
          style={{ width: "65%", margin: "100px auto auto", height: "auto" }}
        >
          {gameDisplay}
          <div className={classes.tabs}>
            <Typography align="center" style={{ color: "black", padding: 15 }}>
              {moment(lineup.game.startTime).format("LLL")} @{" "}
              {lineup.references.venueReferences[0].name} in{" "}
              {lineup.references.venueReferences[0].city}
            </Typography>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab label="Home Lineup" {...a11yProps(0)} />
              <Tab label="Batting Order" {...a11yProps(1)} />
              <Tab label="Away Lineup" {...a11yProps(2)} />
              <Tab label="Batting Order" {...a11yProps(3)} />
            </Tabs>

            <TabPanel className={classes.dateTime} value={value} index={0}>
              {homeSortedFieldingLineup.map(obj => {
                if (obj.player) {
                  return (
                    <Grid item xs={12} key={obj.player.id}>
                      <Typography align="center">
                        {obj.position} {obj.player.firstName}{" "}
                        {obj.player.lastName} #{obj.player.jerseyNumber}
                      </Typography>
                    </Grid>
                  );
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {homeSortedBattingLineup.map(obj => {
                if (obj.player) {
                  return (
                    <Grid item xs={12} key={obj.player.id}>
                      <Typography align="center">
                        {obj.position.charAt(2)}. {obj.player.firstName}{" "}
                        {obj.player.lastName}
                      </Typography>
                    </Grid>
                  );
                } else {
                  return <div />;
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {awaySortedFieldingLineup.map(obj => {
                if (obj.player) {
                  return (
                    <Grid item xs={12} key={obj.player.id}>
                      <Typography align="center">
                        {obj.position} {obj.player.firstName}{" "}
                        {obj.player.lastName} #{obj.player.jerseyNumber}
                      </Typography>
                    </Grid>
                  );
                }
              })}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {awaySortedBattingLineup.map(obj => {
                if (obj.player) {
                  return (
                    <Grid item xs={12} key={obj.player.id}>
                      <Typography align="center">
                        {obj.position.charAt(2)}. {obj.player.firstName}{" "}
                        {obj.player.lastName}
                      </Typography>
                    </Grid>
                  );
                } else {
                  return <div />;
                }
              })}
            </TabPanel>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  } else {
    return <div />;
  }
}
