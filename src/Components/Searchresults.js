import React from 'react';
import '../Styles/Searchresults.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarIcon from '@material-ui/icons/Star';
import JSONDATA from '../data/final_data.json';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { AutoSizer, List } from 'react-virtualized';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    height: 200,
  },
  image: {
    width: 250,
    height: 180,
  },
  img: {
    width: 250,
    height: 180,
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  const Place = ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Paper style={style} key={key}>
        <Grid container spacing={2}>
          <Grid item>
            <img
              className={classes.img}
              alt="complex"
              src={JSONDATA[index].image}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h2 gutterBottom variant="subtitle1">
                  {JSONDATA[index].title}
                </h2>
                <Typography variant="body2" gutterBottom>
                  {JSONDATA[index].address}
                </Typography>
              </Grid>

              <div className="searchResult__infoBottom">
                <div className="searchResult__stars">
                  <StarIcon className="searchResult__star" />
                  <p>
                    <strong>{JSONDATA[index].star}</strong>
                  </p>
                </div>
                <div className="btn_detail">
                  <Button variant="contained" color="secondary">
                    <a href={JSONDATA[index].url} target="_blank">
                      Detail
                    </a>
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  return (
    <List
      width={600}
      height={400}
      rowCount={JSONDATA.length}
      rowHeight={232}
      rowRenderer={Place}
    />
  );
}
