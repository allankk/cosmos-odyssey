import React, { useState } from "react";
import { useEffect } from "react";
import { findDifference, createDate } from "../../helpers/flightTime";
import uniqid from 'uniqid';
import ProviderRow from './ProviderRow';

function RouteTable(props) {
    // route/flight providers in an array. Sorting is implemented through sorting the array of providers.
    const [providers, setProviders] = useState([]);
    const [currentSorting, setCurrentSorting] = useState({column: null, ascending: false});

    // when the chosen route is changed, updates the results based on the new route
    useEffect(() => {
        let routeTable = [];

        props.route.providers.forEach(route => {
            routeTable.push({
                companyID: route.company.id, 
                company: route.company.name,
                price: route.price,
                flightStart: createDate(route.flightStart),
                flightEnd: createDate(route.flightEnd),
                flightTime: findDifference(route.flightStart, route.flightEnd),
                distance: props.route.routeInfo.distance
            })
        })

        setProviders(routeTable);      
    }, [props.route])

    const handleSorting = (column) => {
        let ascending;
        let data;

        // checks if previous sorting was done on the same column.
        if (currentSorting.column == column) {
            ascending = !currentSorting.ascending;
        } else {
            ascending = true;
        }

        // company name has to be sorted as a string
        if (column == "company") {
            if (ascending) {
                data = [...providers].sort((a, b) => (a.company.localeCompare(b.company)));
            } else {
                data = [...providers].sort((a, b) => (b.company.localeCompare(a.company)));
            }
        } else {
            if (ascending) {
                data = [...providers].sort((a, b) => a[column] - b[column]);
            } else {
                data = [...providers].sort((a, b) => (b[column] - a[column]));
            }
        }

        setCurrentSorting({column: column, ascending: ascending});
        setProviders(data);
    }

    return(
        <div className="mt-6 sm:mt-20 flex flex-col items-center">
            <h3 className="text-lg font-bold">Showing travel options from {props.route.routeInfo.from.name} to {props.route.routeInfo.to.name}</h3>
            <div className="max-w-full w-full overflow-auto md:w-full flex justify-center">
                <div className="sm:mt-10 w-full md:w-10/12 border-separate table-auto border-spacing-y-4">
                        <div className="flex h-10 shadow-2xl cursor-pointer font-bold select-none">
                            <div className="flex justify-center items-center basis-1/5 md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("company")}>company</div>
                            <div className="flex justify-center items-center basis-1/5 md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("price")}>price</div>
                            <div className="hidden md:flex md:justify-center md:items-center basis-1/5 md:block md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("distance")}>distance</div>
                            <div className="flex justify-center items-center basis-1/5 md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("flightTime")}>flight time</div>
                            <div className="flex justify-center items-center basis-1/5 md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("flightStart")}>departure</div>
                            <div className="flex justify-center items-center basis-1/5 md:basis-1/6 hover:text-zinc-200" onClick={() => handleSorting("flightEnd")}>arrival</div>
                        </div>
                    <div>
                        {providers.map(provider => (
                            <ProviderRow key={uniqid()} provider={provider} priceListID={props.priceList.id} routeID={props.route.routeInfo.id} routeFrom={props.route.routeInfo.from.name} routeTo={props.route.routeInfo.to.name}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )


}

export default RouteTable;