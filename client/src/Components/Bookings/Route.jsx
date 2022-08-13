import React from "react";
import { formatTime, formatDuration } from '../../helpers/flightTime';

// displays route information about a specific booking
function Route(props) {
    return (
        <div className="m-4 border flex flex-col p-2 border-indigo-700 shadow">
            <div className="mx-auto">
                <span><b>{props.data.routeFrom}</b> to <b>{props.data.routeTo}</b></span>    
            </div>
            <div className="flex justify-around">
                <div className="flex flex-col">
                    <div>Company: {props.data.provider.company}</div>
                    <div>Price: {props.data.provider.price} €</div>
                    <div>Distance: {props.data.provider.distance}</div>
                </div>
                <div className="flex flex-col">
                    <div>Departure: {formatTime(props.data.provider.flightStart)}</div>
                    <div>Arrival: {formatTime(props.data.provider.flightEnd)}</div>
                    <div>Duration: {formatDuration(props.data.provider.flightTime)}</div>
                </div>
            </div>

        </div>
    )
}

export default Route;