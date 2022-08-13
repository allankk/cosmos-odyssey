// Returns an array of all possible origins from the given pricelist
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

// Returns an array of all possible destinations based on the given origin and the given pricelist
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

// Returns an array of all possible routes based on the given origin and a route array (each route is an object from the pricelist)
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