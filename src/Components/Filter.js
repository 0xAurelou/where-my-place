import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

function FullWidthTabs({ tabValue, setTabValue }) {
  const classes = useStyles();

  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Visiter" />
          <Tab label="Sortir" />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default FullWidthTabs;
