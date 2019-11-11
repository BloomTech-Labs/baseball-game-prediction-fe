import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import getLogo from "../../utils/getLogo";
import getWallpaper from "../../utils/getWallpaper";
import Button from "@material-ui/core/Button";
import { getFavoriteTeams } from "../../Redux/actions/index";
import { getProfile } from "../../Redux/actions/index";
import { deleteFavorite } from "../../Redux/actions/index";
import { deleteProfile } from "../../Redux/actions/index";
import { getTeamsDB } from "../../Redux/actions/index";
import { getFollowingTeams } from "../../Redux/actions/index.js"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 40
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: 40
  }
}));

const Profile = props => {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    props.getTeamsDB();
  }, []);

  useEffect(() => {
    props.getFavoriteTeams(props.profile_id);
  }, [props.profile_id]);

  console.log("favorite", props.favorite)

  useEffect(() => {
    setFavorites(props.favorite);
  }, [props.favorite]);

  useEffect(() => {
    props.getProfile(props.profile_id);
  }, [props.profile_id]);

  const submit = abv => {
    props.deleteFavorite(abv.favorite_id);
    const newArr = favorites.filter(fav => fav.team_id != abv.team_id);
    return setFavorites(newArr);
  };

  const remove = () => {
    const redirect = () => props.history.push("/register");
    deleteProfile(props.profile_id, redirect);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h1
            style={{
              fontFamily: "Times New Roman, Times, serif",
              color: "maroon"
            }}
          >
            Welcome {props.username}!
          </h1>
        </Paper>
      </Grid>
      <Grid item xs={6} style={{ paddingBottom: 0 }}>
        <Paper className={classes.paper}>
          <h3>Your Favorite Team</h3>
        </Paper>
        <Grid
          container
          justify="center"
          item
          xs={12}
          style={{ paddingBottom: 0 }}
        >
          {favorites.map(fav => {
            if (fav.favorite === 1) {
              return (
                <p key={fav.favorite}>
                  x
                  <img
                    onClick={() => submit(fav)}
                    src={getLogo(fav.abbreviation)}
                    width="180px"
                  />
                </p>
              );
            }
          })}
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ paddingBottom: 0 }}>
        <Paper className={classes.paper}>
          <h3>Teams You Are Following</h3>
        </Paper>
        <Grid
          container
          justify="center"
          item
          xs={12}
          style={{ paddingBottom: 0 }}
        >
          {favorites.map(abv => {
            return (
              <p key={`${abv.abbreviation}xclosebutton`}>
                x
                <img
                  style={{ margin: 10 }}
                  onClick={() => submit(abv)}
                  src={getLogo(abv.abbreviation)}
                  width="70px"
                />
              </p>
            );
          })}
        </Grid>
      </Grid>
      <Grid container justify="center">
        {favorites.map(fav => {
          if (fav.favorite === 1) {
            return (
              <img
                src={getWallpaper(fav.abbreviation)}
                key={`${fav.favorite}hasdh`}
              />
            );
          }
        })}
      </Grid>
      <Link to="/favoriteTeam">
        <Button
          style={{ margin: 6 }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add A Favorite Team
        </Button>
      </Link>
      <Link to="/addTeam">
        <Button
          style={{ margin: 6 }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Add Teams To Follow
        </Button>
      </Link>
      <Button
        style={{ margin: 6 }}
        onClick={() => remove()}
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Delete Your Account
      </Button>
      <br />
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: state.profile_id,
    favorite: state.favoriteTeams,
    profile: state.profile,
    username: state.username,
    teams: state.teams,
    following: state.followingTeams
  };
};

export default connect(
  mapStateToProps,
  { getFavoriteTeams, getProfile, deleteFavorite, deleteProfile, getTeamsDB, getFollowingTeams }
)(Profile);
