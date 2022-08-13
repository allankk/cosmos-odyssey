import React from "react";
import { Link } from 'react-router-dom';

function ProviderRowDetails(props) {

    return (
        <div className="basis-full py-2 mt-2">
            <Link to="/bookflight" state={props}>
                <button className="bg-slate-200 text-black py-2 px-6 rounded-full shadow-md hover:text-white hover:bg-indigo-800">Book this flight!</button> 
            </Link>
        </div>
    )
}

export default ProviderRowDetails;
