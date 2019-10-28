import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 70
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function TeamList(props) {
  const classes = useStyles();

  console.log(props.division);

  return (
    <div className={classes.root}>
      <List
        component="nav"
        aria-label="list"
        className="division-list"
        subheader={
          <ListSubheader component="div" id="list-subheader">
            {`${props.division[0].league} ${props.division[0].division}`}
          </ListSubheader>
        }
      >
        {props.division.map(team => {
          return (
            <ListItem button key={`${team.team_id}`}>
              <ListItemText primary={`${team.team_name}`} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
