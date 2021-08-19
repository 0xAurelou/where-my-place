import React from "react";
import { useState } from "react";
import JSONDATA from "../data/final_data.json";
import '../Styles/Searchbar.css';

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {JSONDATA.filter((val) =>{
          if(searchTerm == "")
          {
              return 
          }else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
      }).map((val, key) => {
        return (
          <div className="title" key={key}>
            <p>{val.title}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Searchbar;
