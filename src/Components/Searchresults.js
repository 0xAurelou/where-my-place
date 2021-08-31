import React, { useEffect, useState } from 'react';
import '../Styles/Searchresults.css';
import StarIcon from '@material-ui/icons/Star';
import JSONDATA from '../data/final_data.json';
import JSONPlaces from '../data/places.json';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { List } from 'react-virtualized';
import utils from './utils';

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

export default function ComplexGrid({ lon, lat, tabValue, places }) {
  const classes = useStyles();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(places);
    const newJSON = tabValue ? JSONDATA : JSONPlaces;
    const newResults =
      newJSON &&
      newJSON
        .filter((x) => {
          return utils.getDistanceFromLatLonInKm(lat, lon, x.lat, x.lon) < 4;
        })
        .sort((a, b) =>
          utils.getDistanceFromLatLonInKm(lat, lon, a.lat, a.lon) <
          utils.getDistanceFromLatLonInKm(lat, lon, b.lat, b.lon)
            ? -1
            : 1,
        );

    console.log(newResults.length);
    setResults(newResults);
  }, [lon, lat, tabValue]);

  const Place = ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <Paper style={style} key={key}>
        <Grid container spacing={2}>
          {results[index].image && (
            <Grid item>
              <img
                className={classes.img}
                alt="complex"
                src={results[index].image}
              />
            </Grid>
          )}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h2 gutterBottom variant="subtitle1">
                  {results[index].title}
                </h2>
                <Typography variant="body2" gutterBottom>
                  {results[index].address}
                </Typography>
              </Grid>

              <div className="searchResult__infoBottom">
                {results[index].star && (
                  <div className="searchResult__stars">
                    <StarIcon className="searchResult__star" />
                    <p>
                      <strong>{results[index].star}</strong>
                    </p>
                  </div>
                )}
                <div className="btn_detail">
                  <Button variant="contained" color="secondary">
                    <a
                      href={
                        results[index].url ||
                        utils.getMapsUrl(results[index], lat, lon)
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
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
      height={450}
      rowCount={results.length}
      rowHeight={232}
      rowRenderer={Place}
    />
  );
}
