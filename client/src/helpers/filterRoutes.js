
const getAllOrigins = (priceList) => {
    let originArray = [];

    priceList.forEach(route => {
        if (!originArray.includes(route.routeInfo.from.name)) {
            originArray.push(route.routeInfo.from.name);
        };
    });

    let originsObjects = [];
    originArray.forEach(origin => {
        originsObjects.push({
            value: origin,
            label: origin
        });
    });

    return originsObjects;
}

const getAllDestinations = (possibleRoutesArray) => {
    let routeObjects = [];
    possibleRoutesArray.forEach(route => {
        routeObjects.push({
            value: route.routeInfo.to.name,
            label: route.routeInfo.to.name
        })
    })

    return routeObjects;
}



// // returns array of all origin locations. Locations are objects that have a label and a value property
// const getAllOrigins = (routeList) => {
//     let originArray = [];

//     routeList.forEach(route => {
//         if (!originArray.includes(route.routeInfo.from.name)) {
//             originArray.push(route.routeInfo.from.name);
//         };
//     });  
    
//     return originArray;
// };

const getPossibleRoutes = (origin, routeList) => {

    if (!Array.isArray(routeList)) return;
    let routesArray = [];

    routeList.forEach(route => {
        if (route.routeInfo.from.name == origin) {
            routesArray.push(route);
        }
    })

    return routesArray;
}

export { getAllOrigins, getPossibleRoutes, getAllDestinations }