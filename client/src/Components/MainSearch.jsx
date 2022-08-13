import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteTable from "./Routes/RouteTable";
import {getAllOrigins, getPossibleRoutes, getAllDestinations} from "../helpers/filterRoutes.js";
import { formatTime, createDate } from "../helpers/flightTime";
import Select from 'react-select';
import customStyle from '../styles/select';

// main page for "/" path. 
function MainSearch() {
    // currently valid priceList
    const [priceList, setPriceList] = useState({});
    
    // available choices for origins and destinations
    const [origins, setOrigins] = useState([]);
    const [destinations, setDestinations] = useState([]);
    
    // possible routes based on the selected origin
    const [possibleRoutes, setPossibleRoutes] = useState([]);

    // currently user-selected origin and destination
    const [originChoice, setOriginChoice] = useState("");
    const [destinationChoice, setDestinationChoice] = useState("");
    
    // currently selected route (origin -> destination)
    const [routeChosen, setRouteChosen] = useState({});

    const [showResults, setShowResults] = useState(false);

    // gets the price list from the server
    const getPriceList = async () => {
        const response = await axios.get('http://localhost:5000/pricelist');
        const body = await response.data;
        return body;
    }

    // gets an array of all possible origin locations for a dropdown selection.
    const getOrigins = (priceList) => {
        setOrigins(getAllOrigins(priceList));
    };

    // gets an array of all possible routes and an array of all possible destinations based on the origin given.
    const getRoutes = (origin, routeList) => {
        setDestinationChoice(null);
        let possibleRoutesArray = getPossibleRoutes(origin, routeList);

        setPossibleRoutes(possibleRoutesArray);
        setDestinations(getAllDestinations(possibleRoutesArray));
    };

    // Once search has been initiated, updates the route given as the search parameters and shows results
    const handleShowResults = () => {
        if (!showResults) {
            setShowResults(true);
        }

        let routeSearch = possibleRoutes.find(route => route.routeInfo.to.name == destinationChoice.value)
        setRouteChosen(routeSearch);
    }

    // initialize the component by getting the currently valid price list and saving it to a state.
    useEffect(() => {
        getPriceList().then(data => {
            setPriceList(data, getOrigins(data.legs));
        });
    }, []);

    return (
        <div className="mx-2 sm:mx-4 text-center">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:h-10 sm:mt-10">
                <div className="flex justify-center items-center px-2 my-2">ORIGIN</div>
                <Select className="sm:w-1/4 shadow-md" styles={customStyle} options={origins} value={originChoice} onChange={choice => setOriginChoice(choice, getRoutes(choice.value, priceList.legs))}/>
                <div className="flex justify-center items-center px-2 my-2">DESTINATION</div>
                <Select className="sm:w-1/4 text-black shadow-md" options={destinations} value={destinationChoice} onChange={(choice) => setDestinationChoice(choice)}/>
                <button className="md:max-w-xs sm:w-1/6 my-4 py-2 sm:my-0 sm:mx-4 bg-white text-black rounded-full shadow-md enabled:hover:text-white enabled:hover:bg-indigo-800" onClick={handleShowResults} disabled={(!destinationChoice) ? true : false}>search</button>
            </div>
            {/* If the search button is pressed, show the route table */}
            {
                showResults &&
                <RouteTable route={routeChosen} priceList={priceList}/>
            }
            <div className="py-10">
                <p>pricelist valid until: {formatTime(createDate(priceList.validUntil))}</p>
            </div>
        </div>
    )
};

export default MainSearch;
