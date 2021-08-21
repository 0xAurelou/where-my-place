import React from 'react';
import '../Styles/Searchresults.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { Button } from '@material-ui/core';

function SearchResult({
    image,
    location,
    title,
    type,
    star,
    url,
}) {
    return (
        <div className='searchResult'>
            <div className="image_search">
            <img src={image} alt=""/>
            </div>
            
            <FavoriteBorderIcon className="searchResult__heart" />

            <div className='searchResult__info'>
                <div className="searchResult__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    <p>____</p>
                    <p>{type}</p>
                </div>

                <div className="searchResult__infoBottom">
                    <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div>
                    <div className="btn_detail">
                    
                    <Button variant="contained" color="secondary" >
                        <a href={url} target="_blank" >Detail</a>
                        
                        </Button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult