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

export default function ComplexGrid() {
  const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                JSONDATA.map(Data => (

                
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
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
                        
                        <Button variant="contained" color="secondary" >
                            <a href={Data.url} target="_blank" >Detail</a>
                            </Button>
                        </div>
                    </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
                ))
        }
        </div> 
  );
}