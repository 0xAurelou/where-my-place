import React from "react";
import Shot from "../Images/shot.png";
import MyPlace from '../Images/Where-my-place.png'
import MenuIcon from "@material-ui/icons/Menu";
import TextField from "@material-ui/core/TextField";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import '../Styles/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-menu-btn">
        <MenuIcon></MenuIcon>
      </div>
      <span className="navbar-img">
          
        <img src={Shot} alt="shot-logo"></img>
        <img src={MyPlace} alt="my-place-logo"></img>

      </span>
      <div className="navbar-searchbar">
      <TextField id="standard-search" label="Search" type="search"/>
      </div>
      <div className="navbar-icon">
          <div className="navbar-darkmode-btn">
              <btn>
              <Brightness3Icon></Brightness3Icon>
              </btn>
              <btn>
                  <a className="navbar-conatct-btn">Contact</a>
              </btn>
          </div>
      </div>
    </div>
  );
}

export default Navbar;
