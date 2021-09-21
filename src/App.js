import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Form from './Components/Form';
import { Container } from '@material-ui/core';
import SearchResult from './Components/Searchresults';
import Filter from './Components/Filter';
import { useState } from 'react';
import idf from './Images/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh',
  },
  phantom: {
    display: 'block',
    height: '20px',
    width: '100%',
  },
  footer: {
    backgroundColor: '#F8F8F8',
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '20px',
    position: 'fixed',
    left: '0',
    bottom: '0',
    height: '20px',
    width: '100%',
  },
}));

function App() {
  const [lon, setLon] = useState(2.3200410217200766);
  const [lat, setLat] = useState(48.8588897);
  const [tabValue, setTabValue] = useState(0);
  const [places, setPlaces] = useState([]);
  const classes = useStyles();

  return (
    <>
      <div className="App">
        <Navbar />
        <Container maxWidth="lg">
          <Grid container spacing={3} className={classes.root}>
            <Grid item md={6} sm={12}>
              <Filter tabValue={tabValue} setTabValue={setTabValue} />
              <Form setLon={setLon} setLat={setLat} setPlaces={setPlaces} />
              <SearchResult
                lon={lon}
                lat={lat}
                tabValue={tabValue}
                places={places}
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <Map lon={lon} lat={lat} />
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.phantom} />
      <div className={classes.footer}>
        <center>
          <a href="https://www.iledefrance.fr/" target="_blank" rel="noreferrer">
            <img src={idf} alt="partenaire ile de france" height="20px" />
          </a>
        </center>
      </div>
    </>
  );
}

export default App;
