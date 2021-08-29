import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import utils from './utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: `${theme.spacing(2)}px 0`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Form({ setLon, setLat }) {
  const classes = useStyles();
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [name, setName] = useState('Paris');
  const [value, setValue] = useState('');

  return (
    <center>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
          <MyLocationIcon />
        </IconButton>
        <InputBase
          value={value}
          className={classes.input}
          placeholder="Rechercher autour de..."
          onChange={(e) => {
            if (typingTimeout) clearTimeout(typingTimeout);
            setValue(e.target.value);

            setTypingTimeout(
              setTimeout(() => {
                const res = utils.geocode(e.target.value);
                if (res.length) {
                  console.log('test');
                  setLat(Number(res[0].lat));
                  setLon(Number(res[0].lon));
                  setName(res[0].display_name);
                }
              }, 1000),
            );
          }}
        />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => setValue(name)}
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="directions"
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </center>
  );
}
