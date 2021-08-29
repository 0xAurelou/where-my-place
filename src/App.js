import './App.css';

import Grid from '@material-ui/core/Grid';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import Form from './Components/Form';
import { Container } from '@material-ui/core';
import SearchResult from './Components/Searchresults';
import Filter from './Components/Filter';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Filter/>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item sm={6}>
            <Form />
          <SearchResult/>
          </Grid>
          <Grid item sm={6}>
            <Map />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
