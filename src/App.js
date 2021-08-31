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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh'
  },
}));

function App() {
  const [lon, setLon] = useState(2.3200410217200766);
  const [lat, setLat] = useState(48.8588897);
  const [tabValue, setTabValue] = useState(0);
  const [places, setPlaces] = useState([]);
  const classes = useStyles()

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={3} className={classes.root}>
          <Grid item sm={6}>
            <Filter tabValue={tabValue} setTabValue={setTabValue} />
            <Form setLon={setLon} setLat={setLat} setPlaces={setPlaces} />
            <SearchResult lon={lon} lat={lat} tabValue={tabValue} places={places} />
          </Grid>
          <Grid item sm={6}>
            <Map lon={lon} lat={lat} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
