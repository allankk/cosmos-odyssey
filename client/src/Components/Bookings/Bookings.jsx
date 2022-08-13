import React, { useState } from "react";
import { useEffect } from "react";
import uniqid from 'uniqid';
import axios from 'axios';
import UserBookings from './UserBookings';
import { useLocation } from 'react-router-dom';

function Bookings(props) {

    const [allBookings, setAllBookings] = useState([]);

    const location = useLocation();

// First Name
// Last Name
// Route(s)
// Total QUoted Price
//  Total quoted travel time
// transportation company names

    const getAllBookings = async () => {
        const response = await axios.get('http://localhost:5000/api/all-bookings');
        const body = await response.data;
        return body;
    }

    useEffect(() => {
        getAllBookings().then(data => {
            setAllBookings(data);
        });
    }, []);

    return (
        <div className="mt-6 sm:mt-20 flex flex-col items-center justify-center w-full md:w-[48rem] mx-auto">
            <h3 className="text-lg font-bold">Bookings</h3>
            <div className="mt-4 sm:mt-10 w-full">
                {allBookings.map(user => {
                    // if the user was redirected after booking the flight, show their booking details immediately
                    if (location.state && (user.firstName == location.state.firstName && user.lastName == location.state.lastName)) {
                        return <UserBookings userData={user} showDetails={true} key={uniqid()} />
                    } else {
                        return <UserBookings userData={user} showDetails={false} key={uniqid()} sh/>
                    }
                })}
            </div>
        </div>
    )
}

export default Bookings;