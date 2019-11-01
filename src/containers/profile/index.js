import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { axiosWithAuth } from "../../utils/axiosAuth.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getLogo from "../../utils/getLogo";
import Button from "@material-ui/core/Button";
import { getFavoriteTeams } from "../../Redux/actions/index";
import { getProfile } from "../../Redux/actions/index";
import { deleteFavorite } from "../../Redux/actions/index";
import { deleteProfile } from "../../Redux/actions/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 60
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: 60
  }
}));

const Profile = props => {
  const classes = useStyles();  
  const [favorites, setFavorites] = useState([]);
  
  useEffect(() => {
    props.getFavoriteTeams(props.profile_id)
  }, [props.profile_id])  

  useEffect(() => {
    setFavorites(props.favorite)
  }, [props.favorite])
 

  useEffect(() => {
    props.getProfile(props.profile_id)
  }, [props.profile_id]) 

  const submit = abv => {  
    props.deleteFavorite(abv.favorite_id)
    const newArr = favorites.filter(fav => fav.team_id != abv.team_id)
    return setFavorites(newArr)
  }
  
  const remove = () => {   
    const redirect = () => props.history.push('/register')
    deleteProfile(props.profile_id, redirect)    
  }


  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>Welcome {props.username}!</h1>
        </Paper>
      </Grid>
      <Grid item xs={6} style={{ paddingBottom: 70 }}>
        <Paper className={classes.paper}>
          <h3>Your Favorite Teams</h3>
        </Paper>
      </Grid>
      <Grid
        container
        justify="center"
        item
        xs={12}
        style={{ paddingBottom: 50 }}
      >
        {favorites.map(abv => {
          return (
            <button onClick={() => submit(abv)} style={{ color: "red" }}>
              x<img src={getLogo(abv.abbreviation)} width="80px" />
            </button>
          );
        })}
      </Grid>
      <Link to="/addTeam">
        <Button variant="contained" color="primary" className={classes.button}>
          Add More Favorite Teams To Follow
        </Button>
      </Link>      
        <Button onClick={() => remove()} variant="contained" color="secondary" className={classes.button}>
          Delete Your Account
        </Button>      
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: state.profile_id,
    favorite: state.favoriteTeams,
    profile: state.profile,
    username: state.username
  };
};

export default connect(
  mapStateToProps,
  {getFavoriteTeams, getProfile, deleteFavorite, deleteProfile}
)(Profile);
