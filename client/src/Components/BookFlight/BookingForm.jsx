import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function BookingForm(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [displayInformation, setDisplayInformation] = useState("");

    const navigate = useNavigate();

    // POST request to the server to book the flight
    const sendPOST = async (obj) => {
        const result = await axios.post('http://localhost:5000/api/book-flight', obj);
        
        // displays a popup window explaining whether the POST request was successful and redirects the user to the next page
        if (result.data == 'priceList not valid') {
            setDisplayInformation("expired");
            redirect("/");
        } else if (result.data == 'OK') {
            setDisplayInformation("success");
            redirect("/bookings")
        }
    }

    // redirects the user to another path
    const redirect = (path) => {
        setTimeout(() => {
            navigate(path, {state: {firstName: firstName, lastName: lastName}});
        }, 3000)
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (!firstName || !lastName) {
            setErrorMessage("Please enter your name to book the flight");
        } else {
            let bookingInformation = {
                firstName: firstName,
                lastName: lastName,
                bookings: {...props}
            };
            sendPOST(bookingInformation);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col py-8 items-center w-full sm:w-auto px-4 sm:px-24 shadow-2xl border border-gray-800 bg-indigo-50 text-black rounded">
            <label className="my-2">
                <span className="mx-4 font-bold">First Name </span>
                <input className="focus:outline-0 p-2 border rounded" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </label>
            <label className="my-2">
                <span className="mx-4 font-bold">Last Name </span>
                <input className="focus:outline-0 p-2 border rounded" type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label>
            <input className="mt-4 py-2 px-6 bg-indigo-700 border border-white rounded-full shadow-lg text-white hover:bg-indigo-800 hover:cursor-pointer" type="submit" value="Submit" />
            {/* checks whether first and last name have been written */}
            {errorMessage && <div className="font-italic">{errorMessage}</div>}
            {/* Popup after submitting a booking POST request */}
            {displayInformation == "success" && 
                <div className="container flex justify-center mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                        <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                            <div className="flex items-center justify-center">
                                <h3 className="text-2xl">Success, your flight is booked!</h3>
                            </div>
                            <div className="my-2 flex items-center justify-center">
                                <p className="mt-4 text-md">Redirecting you to your bookings.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {displayInformation == "expired" && 
                <div className="container flex justify-center mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
                        <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
                            <div className="flex items-center justify-center">
                                <h3 className="text-2xl">Failed, pricelist has expired!</h3>
                            </div>
                            <div className="my-2 flex items-center justify-center">
                                <p className="mt-4 text-md">Redirecting you to route selection.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </form>
    )
}

export default BookingForm;