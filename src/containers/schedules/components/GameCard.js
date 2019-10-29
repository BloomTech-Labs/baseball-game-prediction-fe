import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import getLogo from '../../../utils/getLogo';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    margin: "75px auto 25px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function GameCard(props) {
  const classes = useStyles();
  console.log("scheduleprops", props)
  return (
    <Grid container className={classes.root} justify="center" style={{ margin: "20px auto auto" }}>
          <Grid
            item
            xs={10}
            sm={12}
            style={{ paddingBottom: 12 }}
          >
            <Paper className={classes.paper} elevation={5}>
              <Grid container>
                <Grid
                  item
                  xs={4}
                  style={
                    props.home_score > props.away_score
                      ? {
                          border: "4px solid lightgreen"
                        }
                      : null
                  }
                >
                  <h6 style={{ margin: "5px" }}>Home</h6>
                  <img src={getLogo(props.home_team)} width="50px" />
                </Grid>
                <Grid item xs={4}>
                  <h6 style={{ margin: "5px" }}>Score</h6>
                  <Typography variant="h6">{`${props.home_score} : ${props.away_score}`}</Typography>
                  <h6 style={{ margin: "5px" }}>{props.date}</h6>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={
                    props.home_score < props.away_score
                      ? {
                          border: "4px solid lightgreen"
                        }
                      : null
                  }
                >
                  <h6 style={{ margin: "5px" }}>Away</h6>
                  <img src={getLogo(props.away_team)} width="50px" />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
      </Grid>
  );
}