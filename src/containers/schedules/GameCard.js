import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';

const useStyles = makeStyles({
    card: {
      minWidth: 275,
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-evenly',
      alignContent: 'space-evenly'
    },
    title: {
      fontSize: 14,
    },
    smallDivs: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function GameCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.card}>
        <div className={classes.smallDivs}>
        <Typography className={classes.title} gutterBottom>
          {props.away_team}
          <br/>
          {props.away_score}
          <br/>
          {(props.away_score > props.home_score) ? "W" : (props.away_score == props.home_score) ? "T" : "L"}
        </Typography>
        </div>
        <div className={classes.smallDivs}>
        <Typography variant="h5" component="h2">
          @
          <br/>
          {moment(props.date).format('LLL')}
        </Typography>
        </div>
        <div className={classes.smallDivs}>
        <Typography className={classes.title} gutterBottom>
          {props.home_team}
          <br/>
          {props.home_score}
          <br/>
          {(props.home_score > props.away_score) ? "W" : (props.home_score == props.away_score) ? "T" : "L"}
        </Typography>
        </div>
      </CardContent>
    </Card>
  );
}