import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import { Grid, Typography, Tabs, Tab, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getLineup } from "../../utils/getLineup";
import { getPrediction } from "../../utils/getPrediction";

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
    marginTop: 75
  }
}));

export default function GameData(props) {
  const { date, away, home } = props.match.params;
  const [lineup, setLineup] = useState({});
  const [prediction, setPrediction] = useState({});
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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

  console.log("lineup ", lineup);
  console.log("prediction ", prediction);

  let gameDisplay;

  if (lineup.teams && prediction.data) {
    gameDisplay = (
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={5}>
          <img
            src={getLogo(lineup.teams[1].data[0].abbreviation)}
            width="100px"
            style={{ display: "block", margin: "auto" }}
          />
          {prediction.data["Winning team"] ===
          lineup.teams[1].data[0].abbreviation ? (
            <Typography align="center">WINNER</Typography>
          ) : (
            <Typography align="center">LOSER</Typography>
          )}
        </Grid>
        <Grid item xs={2}>
          <Typography align="center">VS</Typography>
        </Grid>

        <Grid item xs={5}>
          <img
            src={getLogo(lineup.teams[0].data[0].abbreviation)}
            width="100px"
            style={{ display: "block", margin: "auto" }}
          />
          {prediction.data["Winning team"] ===
          lineup.teams[0].data[0].abbreviation ? (
            <Typography align="center">WINNER</Typography>
          ) : (
            <Typography align="center">LOSER</Typography>
          )}
        </Grid>
      </Grid>
    );
  }

  if (prediction !== {}) {
    return (
      <div style={{ width: "50%", margin: "150px auto" }}>
        {gameDisplay}
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="Home Team Lineup" {...a11yProps(0)} />
            <Tab label="Away Team Lineup" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            Home Team Lineup
          </TabPanel>
          <TabPanel value={value} index={1}>
            Away Team Lineup
          </TabPanel>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}
