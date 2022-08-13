import React, { useState } from "react";
import { formatTime, formatDuration } from "../../helpers/flightTime";
import uniqid from 'uniqid';
import ProviderRowDetails from './ProviderRowDetails';

function ProviderRow(props) {
    // clicking on a given provider shows details of that particular flight/route
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="flex flex-wrap rounded py-2 my-2 shadow-2xl border border-gray-800 bg-gradient-to-r from-indigo-900 to-blue-900 text-white w-full block cursor-pointer" onClick={() => {setShowDetails(!showDetails)}} key={uniqid()}> 
            <div className="basis-1/5 md:basis-1/6" key={uniqid()}>{props.provider.company}</div>
            <div className="basis-1/5 md:basis-1/6" key={uniqid()}>{props.provider.price}</div>
            <div className="hidden basis-1/5 md:block md:basis-1/6" key={uniqid()}>{props.provider.distance}</div>
            <div className="basis-1/5 md:basis-1/6" key={uniqid()}>{formatDuration(props.provider.flightTime)}</div>
            <div className="basis-1/5 md:basis-1/6" key={uniqid()}>{formatTime(props.provider.flightStart)}</div>
            <div className="basis-1/5 md:basis-1/6" key={uniqid()}>{formatTime(props.provider.flightEnd)}</div>
            {
                showDetails &&
                <ProviderRowDetails priceListID={props.priceListID} routeID={props.routeID} provider={props.provider} routeFrom={props.routeFrom} routeTo={props.routeTo}/>
            }
        </div>
    )

}

export default ProviderRow;

