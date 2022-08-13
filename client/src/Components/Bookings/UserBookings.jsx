import React, { useState } from "react";
import Route from './Route';
import uniqid from 'uniqid';
import { formatDuration } from '../../helpers/flightTime';

// component of a specific user
function UserBookings(props) {
    const [isClicked, setIsClicked] = useState(props.showDetails);

    // renders each booking of the current user separately
    const renderRoutes = () => {
        if (isClicked) {
            return props.userData.bookings.map(route => {
                return <Route data={route} key={uniqid()} />
            })
        }
    }

    // renders the summarized info (total price, total flight time) about the current user.
    const renderSummarizedInfo = () => {
        if (isClicked) {
            return (
                <div className="flex flex-col sm:flex-row justify-around">
                    <div className="basis-5/12 flex justify-center">
                        <span className="font-bold">total price&nbsp;&nbsp;</span>
                        <span>{props.userData.totalPrice}</span>
                        <span>€</span>
                    </div>
                    <div className="basis-5/12 flex justify-center">
                        <span className="font-bold">total flight time&nbsp;&nbsp;</span>
                        <span>{formatDuration(props.userData.totalTravelTime)}</span>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="bg-indigo-50 my-4 text-black border rounded cursor-pointer w-full shadow-lg">
            <div className="p-4 flex justify-center select-none" onClick={() => setIsClicked(!isClicked)}>{props.userData.firstName} {props.userData.lastName}</div>
            { renderSummarizedInfo() }
            { renderRoutes() }
        </div>
    )
}

export default UserBookings;