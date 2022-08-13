async function run() {
    // initialize database
    const db = require('./database/connection');
    await db.loadDatabase();

    // intialize collections
    const collections = require('./database/collections');
    await collections.checkIfCollectionsExist();

    // initialize express
    const express = require('express');
    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    // prevent CORS restrictions by setting the following headers
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });
    
    // GET request that returns the currently valid price list from the database
    app.get("/pricelist", function(req, res) {
        (async() => {
            let priceListsAPI = require('./api/priceLists');
            let result = await priceListsAPI.getLatestPriceList();
            console.log('GET: currently valid price list');
            res.send(result);
            }
        )();
    });

    // GET request that returns all bookings
    app.get("/api/all-bookings", function(req, res) {
        (async() => {
            console.log('GET: all bookings');
            const bookingsAPI = require('./api/bookings');
            let result = await bookingsAPI.getAllBookings();
            res.send(result);
            }
        )();
    });

    // POST request that adds a booking to the database
    app.post("/api/book-flight", async function(req, res) {
        const bookingsAPI = require('./api/bookings');
        console.log('POST: booking a flight')

        // checks if the priceList used to book is valid
        let isSuccess = await bookingsAPI.postBookFlight(req.body);
    
        if (isSuccess == false) {
            console.log('POST request failed - priceList not valid');
            res.send('priceList not valid');
        } else {
            res.sendStatus(200);
        }
    });

    let CONFIG = require('./config.json');
    let port = CONFIG.serverPort;

    // assign a port automatically if the port is not given
    if (port == null || port == "") {
        port = 5000;
    };

    // start listening to connections
    app.listen(port, function() {
        console.log("server started successfully");
    })

    // check price list validity in the current database
    let updatePriceLists = require('./services/updatePriceLists');
    updatePriceLists.checkPriceListValidity();
}

module.exports = { run }