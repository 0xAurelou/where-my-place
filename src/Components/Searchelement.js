import React from 'react';
import { Button } from "@material-ui/core";
import SearchResult from "./Searchresults";
import JSONDATA from '../data/final_data.json';

function SearchPage() {
    return (
        <div className='searchPage'>
            <div className='searchPage__info'>
                <p>62 stays · 26 august to 30 august · 2 guest</p>
                <h1>Stays nearby</h1>
                <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of place</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Rooms and beds</Button>
                <Button variant="outlined">More filters</Button>
            </div>
            <SearchResult
                img= {this.props.JSONDATA.map((image) => 
                {
                    return <SearchResult img={image} key={key}/>
                })}
                location= {this.props.JSONDATA.map((adress) => 
                    {
                        return <SearchResult adress={adress} key={key}/>
                    })}
                title= {this.props.JSONDATA.map((title) => 
                    {
                        console.log(JSONDATA[0].title)
                        return <SearchResult title={title} key={key}/>
                    })}
                description= {this.props.JSONDATA.map((type) => 
                    {
                        return <SearchResult description ={type} key={key}/>
                    })}
                star={this.props.JSONDATA.map((totalscore) => 
                    {
                        return <SearchResult star={totalscore} key={key}/>
                    })}
                
            />
        </div>
    )
}

export default SearchPage
