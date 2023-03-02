import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "./Card";

const Countries = () => {
   const [data, setData] = useState([]);
   const [rangeValue, setRangeValue] = useState(36)
   const [selectedRadio, setSelectedRadio] = useState("")
   const radios = ["Africa", "America", "Asia", "Europe", "Oceania"]

   useEffect(() => {
      axios.get("https://restcountries.com/v3.1/all").then((res) => setData(res.data));
   }, [])

   return (
      <div className="countries">
         <ul className="radio-container">
            {/*button range pour le nombre de pays*/}
            <input type="range" min="1" max="250" defaultValue={rangeValue}
                   onChange={(e) => setRangeValue(e.target.value)}/>

            {/*Radio button des continents*/}
            {radios.map((continent) => (
               <li>
                  <input type="radio" id={continent} name="continentRadio" checked={continent === selectedRadio}
                         onChange={(e) => setSelectedRadio(e.target.id)}/>
                  <label htmlFor={continent}>{continent}</label>
               </li>
            ))}
         </ul>

         {/*Button d'annulation de la recherche*/}
         {selectedRadio && (
            <button onClick={() => setSelectedRadio("")}>Annuler la recherche</button>
         )}

         {/*Card des pays*/}
         <ul>
            {data
               .filter((country) => country.continents[0].includes(selectedRadio))
               .sort((a, b) => b.population - a.population)
               .slice(0, rangeValue)
               .map((country, index) => (
                  <Card key={index} country={country}/>
               ))}
         </ul>
      </div>
   );
};

export default Countries;