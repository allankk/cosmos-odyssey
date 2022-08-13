import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { formatTime, formatDuration } from "../../helpers/flightTime";
import BookingForm from './BookingForm';

// flight booking page
function BookFlight() {

    const location = useLocation();
    let props = location.state;

    return (
        <div className="flex flex-col items-center">
            <Link to="/">
                <button className="py-2 px-6 bg-white text-black rounded-full shadow-md hover:text-white hover:bg-indigo-800">Back to route selection</button>
            </Link>
            <div className="mt-10 w-full sm:w-auto">
                <h3 className="text-center mb-4 cursor-default">Please confirm your flight selection</h3>
                <div className="bookingInformation flex flex-col items-center w-full sm:w-auto py-4 px-4 sm:px-32 shadow-2xl border border-gray-800 bg-indigo-50 text-black rounded">
                    <p className="font-bold text-2xl mb-4">{props.routeFrom} &#62; {props.routeTo}</p>
                    <p className="flex w-full justify-between">
                        <span className="font-bold">Company: </span>
                        <span>{props.provider.company}</span>
                    </p>
                    <p className="flex w-full justify-between">
                        <span className="font-bold">Price: </span>
                        <span>{props.provider.price} €</span>
                    </p>
                    <p className="flex w-full justify-between">
                        <span className="font-bold">Distance: </span>
                        <span>{props.provider.distance}</span>
                    </p>
                    <p className="flex w-full justify-between mt-6">
                        <span className="font-bold">Flight time: </span>
                        <span>{formatDuration(props.provider.flightTime)}</span>
                    </p>
                    <p className="flex w-full justify-between">
                        <span className="font-bold">Departure time:&nbsp;&nbsp; </span>
                        <span>{formatTime(props.provider.flightStart)}</span>
                    </p>
                    <p className="flex w-full justify-between">
                        <span className="font-bold">Arrival time: </span>
                        <span>{formatTime(props.provider.flightEnd)}</span>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center mt-10 w-full sm:w-auto">
                <h3 className="text-center mb-4 cursor-default">Enter your details to book your flight</h3>
                <BookingForm {...props} />
            </div>
        </div>
    )
}

export default BookFlight;