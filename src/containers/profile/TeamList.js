import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { postFavoriteTeam } from "../../Redux/actions/index";

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

const TeamList = props => {
  const classes = useStyles(); 
  
  const submit = team => {
    const teams = {
      profile_id: props.profile_id,
      team_id: team.team_id,            
      abbreviation: team.abbreviation,
      favorite: null
      }
    props.postFavoriteTeam(teams)    
  };  

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
            <ListItem
              onClick={() => submit(team)}
              button
              key={`${team.team_id}`}
            > 
            <Link to="/profile">
              <ListItemText primary={`${team.team_name}`} />
            </Link>
            </ListItem>
            
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: state.profile_id
  };
};

export default connect(
  mapStateToProps,
  {postFavoriteTeam}
)(TeamList);
