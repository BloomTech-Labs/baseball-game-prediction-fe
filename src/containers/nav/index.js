import React from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "../home";
import Login from "../login/index";
import Register from "../register/index";
import Profile from "../profile/index";
import { logout } from "../../Redux/actions";
import ProtectedRoute from "../../utils/protectedroute/ProtectedRoute";
import AddTeam from "../profile/TeamList.js";
import Schedules from "../schedules/views/DivisionListView";
import TeamSchedule from "../schedules/views/TeamScheduleView";
import GameData from "../gamedata";
import addFavorite from "../profile/addFavorite";

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1)
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "block"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "flex"
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  title: {
    paddingLeft: 80
  }
}));

const PrimarySearchAppBar = ({ logout, profile_id }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const preventDefault = event => event.preventDefault();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const token = localStorage.getItem("token");

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = e => {
    e.preventDefault();
    logout();
  };
  

  const menuId = "primary-search-account-menu";
  /*const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    
      {profile_id ? (
        <div>
          <Link to="/" className={classes.link}>
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          </Link>
          <Link to="/profile" className={classes.link}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link to="/schedules" className={classes.link}>
            <MenuItem onClick={handleMenuClose}>Schedules</MenuItem>
          </Link>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </div>
      ) : (
        <div>
          <Link to="/" className={classes.link}>
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
          </Link>
          <Link to="/schedules" className={classes.link}>
            {" "}
            <MenuItem onClick={handleMenuClose}>Schedules</MenuItem>
          </Link>
          <Link to="/login" className={classes.link}>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link to="/register" className={classes.link}>
            {" "}
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Link>
        </div>
      )}
      
    </Menu>
  );*/

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to="/" className={classes.link} style={{ color: "white" }}>
            <Typography className={classes.title} variant="h6" noWrap>
              Baseball Game Prediction
            </Typography>
          </Link>
          {profile_id ? (
            <div style={{ display: "flex" }}>
              <Link to="/" className={classes.link} style={{ color: "white" }}>
                <Typography className={classes.title} variant="h6" noWrap>
                  Home
                </Typography>
              </Link>
              <Link
                to="/profile"
                className={classes.link}
                style={{ color: "white" }}
              >
                <Typography className={classes.title} variant="h6" noWrap>
                  Profile
                </Typography>
              </Link>
              <Link
                to="/schedules"
                className={classes.link}
                style={{ color: "white" }}
              >
                <Typography className={classes.title} variant="h6" noWrap>
                  Schedules
                </Typography>
              </Link>
              <Link to="/" className={classes.link}>
                <Typography
                  onClick={handleLogOut}
                  className={classes.title}
                  variant="h6"
                  style={{ color: "red" }}
                  noWrap
                >
                  Logout
                </Typography>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <Link to="/" className={classes.link} style={{ color: "white" }}>
                <Typography className={classes.title} variant="h6" noWrap>
                  Home
                </Typography>
              </Link>
              <Link
                to="/login"
                className={classes.link}
                style={{ color: "white" }}
              >
                <Typography className={classes.title} variant="h6" noWrap>
                  Login
                </Typography>
              </Link>
              <Link
                to="/register"
                className={classes.link}
                style={{ color: "white" }}
              >
                <Typography className={classes.title} variant="h6" noWrap>
                  Register
                </Typography>
              </Link>
            </div>
          )}

          {/*<div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>*/}
        </Toolbar>
      </AppBar>
      ); }
      <main>
        <Route exact path="/" component={Home} />
        <Route
          path="/login"
          render={props => <Login history={props.history} />}
        />
        <Route
          path="/register"
          render={props => <Register history={props.history} />}
        />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/addTeam" component={AddTeam} />
        <Route path="/gamedata/:date/:away/:home" component={GameData} />
        <ProtectedRoute path="/favoriteTeam" component={addFavorite} />
        <Route exact path="/schedules" component={Schedules} />
        <Route exact path="/schedules/:team_id" component={TeamSchedule} />
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  profile_id: state.profile_id
});

export default connect(
  mapStateToProps,
  { logout }
)(PrimarySearchAppBar);
