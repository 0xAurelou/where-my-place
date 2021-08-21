import React from 'react';
import { Button } from "@material-ui/core";
import SearchResult from "./Searchresults";
import JSONDATA from '../data/final_data.json';

function SearchPage() {
    return (
        <div className='searchPage'>
            <SearchResult
                img = "https://www.stampaprint.fr/blog/wp-content/uploads/2016/06/google-logo-lettera-2016.jpg"
                location="1 Rue Oberkampf, 75011 Paris, France"
                title="L'autobus"
                type="Bar"
                star={4.1}
                url = "https://www.google.com/maps/place/L'autobus/@48.8627665,2.3652121,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e077d0166c3:0x14ebb4a7c62ed732!8m2!3d48.8627638!4d2.3674016?hl=fr "
            />
        </div>
    )
}

export default SearchPage
