import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { axiosWithAuth } from "../../utils/axiosAuth.js";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getLogo from "../../utils/getLogo";
import Button from "@material-ui/core/Button";


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
  const [profile, setProfile] = useState();
  const [favorite, setFavorite] = useState([]);  

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/favoriteTeams/${props.profile_id}`)
      .then(res => {        
        setFavorite(res.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);    

  useEffect(() => {
    axiosWithAuth()
      .get(`/api/profiles/${props.profile_id}`)
      .then(res => {
        setProfile(res.data[0].username);        
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  const submit = abv => {
  console.log('submit', abv)
  axiosWithAuth()
  .delete(`/api/favoriteTeams/${abv.favorite_id}`)
  .then(res => {         
    const newArr = favorite.filter(favorite => favorite.team_id != abv.team_id)
    return setFavorite(newArr)    
  })
  .catch(error => {
     console.log('error', error)
  }) 
}
  const remove = () => {
    axiosWithAuth()
    .delete(`/api/profiles/${props.profile_id}`)
    .then(res => {

    })
    .catch(err => {
      console.log('err', err)
    })
  }

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1>Welcome {profile}!</h1>
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
        {favorite.map(abv => {
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
      <Link to="/register">
        <Button onClick={() => remove()} variant="contained" color="secondary" className={classes.button}>
          Delete Your Account
        </Button>
      </Link>
    </Grid>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    profile_id: state.profile_id
  };
};

export default connect(
  mapStateToProps,
  {}
)(Profile);
