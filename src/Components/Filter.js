import React from 'react';
import { Tabs , Tab } from '@material-ui/core';
import { Box , Typography } from '@material-ui/core';
import SearchResult from './Searchresults';
import JSONDATA from '../data/final_data.json';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>
                <SearchResult/>
            </Typography>
          </Box>
        )}
      </div>
    );
  }

function Filter() {
    const [value,setValue] = React.useState()
const handleTabs = (e,val) =>{
    setValue(val)
}
    return (
        <div>
            <Tabs value={value} onChange={handleTabs}>
                <Tab label="Tous" />
                <Tab label="Bar" />
                <Tab label="Autre" />
            </Tabs>
            <TabPanel value={value} index={0}>Tous</TabPanel>
            <TabPanel value={value} index={1}>Bar</TabPanel>
            <TabPanel value={value} index={2}>Autre</TabPanel>
        </div>
    )
}


export default Filter
