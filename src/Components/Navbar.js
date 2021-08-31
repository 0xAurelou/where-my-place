import React from 'react';
import Logo from '../Images/logo-site-removebg-preview.png';
import MenuIcon from '@material-ui/icons/Menu';
import Searchbar from './Searchbar';
import AppBar from '@material-ui/core/AppBar';

import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '7px',
  },
  img: {
    height: '100px',
    margin: 'auto',
  },
  search: {
    padding: '10px',
    width: '700px',
    display: 'center',
  },

  icon: {
    paddingLeft: '80px',
    alignItems: 'right',
  },
  toolbar: {
    height: 'calc(85px + 20vh)',
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${classes.toolbar}`}>
      <img src={Logo} className={classes.img} alt="navbar-logo" />
    </div>
  );
}

export default Navbar;
