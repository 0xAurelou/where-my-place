import React from "react";
import "../Styles/Searchresults.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import JSONDATA from "../data/final_data.json";
import { Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { AutoSizer } from "react-virtualized";
import { FixedSizeList as List } from "react-window";
import { height, width } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
const place = () => (
  <div className={useStyles.root}>
    {JSONDATA.map((Data) => (
      <Paper className={useStyles.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={useStyles.image}>
              <img
                className={useStyles.img}
                alt="complex"
                src={Data.image}
                width="250px"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h2 gutterBottom variant="subtitle1">
                  {Data.title}
                </h2>
                <Typography variant="body2" gutterBottom>
                  {Data.address}
                </Typography>
              </Grid>

              <div className="searchResult__infoBottom">
                <div className="searchResult__stars">
                  <StarIcon className="searchResult__star" />
                  <p>
                    <strong>{Data.star}</strong>
                  </p>
                </div>
                <div className="btn_detail">
                  <Button variant="contained" color="secondary">
                    <a href={Data.url} target="_blank">
                      Detail
                    </a>
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ))}
  </div>
);

export default function ComplexGrid() {
  const classes = useStyles();
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className="list"
          height={height}
          itemCount={JSONDATA.length}
          itemSize={200}
          width={width}
        >
          {place}
        </List>
      )}
    </AutoSizer>
  );
}
