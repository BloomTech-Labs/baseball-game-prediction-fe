import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    alignSelf: "center",
    marginBottom: "30px"
  },
  division: {
    fontSize: "1.5rem",
    textAlign: "center",
    textDecoration: "underline"
  },
  team: {
    paddingLeft: "20px"
  },
  text: {
    textAlign: "center"
  }
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

export default function TeamList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="list"
        className="division-list"
        subheader={
          <Typography
            variant="subtitle1"
            className={classes.division}
            id="list-subheader"
          >
            {`${props.division[0].league} ${props.division[0].division}`}
          </Typography>
        }
      >
        {props.division.map(team => {
          return (
            <Link to={`/schedules/${team.team_id}`} key={`${team.team_id}`}>
              <ListItem button className={classes.team} key={`${team.team_id}`}>
                <ListItemText
                  className={classes.text}
                  primary={`${team.team_name}`}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
}
