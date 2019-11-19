import React, { useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
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
import { getFollowingTeams } from "../../Redux/actions/index.js";
import { deleteFollowing } from "../../Redux/actions/index.js"
import "../../App.css"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },  
  
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: 40
  },
  welcome: {
    marginTop: 100,
    marginLeft: 200
  }
}));

const Profile = props => {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);
  const [followings, setFollowings] = useState([])

  useEffect(() => {
    props.getTeamsDB();
  }, []);

  useEffect(() => {
    props.getFollowingTeams(props.profile_id)
  }, [])  

  useEffect(() => {
    props.getFavoriteTeams(props.profile_id);
  }, []);  

  useEffect(() => {
    setFavorites(props.favorite);
  }, [props.favorite]);

  useEffect(() => {
    setFollowings(props.following)
  }, [props.following]);

  useEffect(() => {
    props.getProfile(props.profile_id);
  }, [props.profile_id]);

  const submit = abv => {
    props.deleteFavorite(abv.favorite_id);    
    const newArr = favorites.filter(fav => fav.team_id != abv.team_id);      
    return setFavorites(newArr);
  };

  const removeFollowing = team => {
    props.deleteFollowing(team.following_id)
    const newArray = followings.filter(f => f.team_id != team.team_id)
    return setFollowings(newArray)
  }

  const remove = () => {
    const redirect = () => props.history.push("/register");
    deleteProfile(props.profile_id, redirect);
  };

  return (
    <div className="background">
      <div className="container">
        <div className="welcome_container">        
          <h1 className="heading">Welcome {props.username}</h1>          
          {favorites.map(fav => {
            if (fav.favorite ===1) {
            return (
              <p style={{color: 'red'}} onClick={() => submit(fav)}>x
              <img
              className="banner"
              
              src={getWallpaper(fav.abbreviation)}
              key={`$fav.favorite`}
              />
              </p>
            )
            } 
            })}
          </div>
            <div className="button_container">
            <Link to="/favoriteTeam">
              <Button style={{ margin: 6 }}
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
            </div>
            <div className="following">
              <h1 className="following_header">Teams You Are Following</h1>
              <div className="logos">
              {followings.map(team => {
                return (
                  
                  <p onClick={() => removeFollowing(team) } 
                  style={{color: "red"}}
                  key={`${team.abbreviation}xclosebutton`}>
                  x
                  <img className="logo"
                  style={{ margin: 10 }}                  
                  src={getLogo(team.abbreviation)}
                  width="90px"
                  />
                  </p>                  
            );
          })}
            </div>
            </div>       
      </div>
      <p className="delete" onClick={() => remove()} style={{color: "red"}}>Delete Profile</p>     
    </div>
  )
}
    {/*<Grid direction="row" className={classes.container}>    
      
        <Box className={classes.welcome}
          fontSize="h4.fontSize"
          fontStyle="italic"
          textAlign="left"
          >
          Welcome<br/> {props.username}!
        </Box>       
        
        <Box
          textAlign="right"
        >
        {favorites.map(fav => {
          if (fav.favorite === 1) {
            return (              
              <img
              style={{width: 300}}
                src={getWallpaper(fav.abbreviation)}
                key={`${fav.favorite}hasdh`}
              />              
            );
          }
        })}
        </Box>     
      
     
      
      
    
            
         
      <Grid item xs={6} style={{ paddingBottom: 0 }}>
       
          <h3>Your Favorite Team</h3>
        
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
                <p onClick={() => submit(fav)}
                   key={fav.favorite}>
                  x
                  <img
                    
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
          {followings.map(team => {
            return (
              <p onClick={() => removeFollowing(team)} 
                 key={`${team.abbreviation}xclosebutton`}>
                x
                <img
                  style={{ margin: 10 }}                  
                  src={getLogo(team.abbreviation)}
                  width="70px"
                />
              </p>
            );
          })}
        </Grid>
      </Grid>
      <Grid container justify="center">
       
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
};*/}

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
  { getFavoriteTeams, getProfile, deleteFavorite, deleteProfile, getTeamsDB, getFollowingTeams, deleteFollowing }
)(Profile);
