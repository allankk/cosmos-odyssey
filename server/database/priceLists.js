const CONFIG = require('../config.json');
const bookings = require ('./bookings');

// database connection object
const db = require('./connection').getDB();

let maxPriceLists = CONFIG.priceLists;


// inserts a price list to the database
const insertPriceList = async (priceList) => {

    await db.collection("priceLists").insertOne(priceList, function(err, res) {
        if (err) throw err;
        console.log("priceList inserted to the database");
    })

    // remove old price list and bookings related to the pricelist
    await deleteOldPriceLists();

}

// deletes the oldest price list if there is more than the set amount in the config. 
const deleteOldPriceLists = async () => {

    try {
        let priceListCount = await db.collection("priceLists").countDocuments();
        
        if (priceListCount > maxPriceLists) {
            result = await db.collection("priceLists").findOne();
            db.collection("priceLists").deleteOne({});
            console.log('deleted PriceList: ' + result.id);

            await bookings.deleteOldBookings(result.id);
        }
    } catch (err) {
        console.log(err);
    }

}

// compares the given pricelist with the latest pricelist in the database
const checkValidity = async (priceListID) => {

    const priceListsAPI = require('../api/priceLists');
    let priceList = await priceListsAPI.getLatestPriceList();

    if (priceList.id != priceListID) {
        return false;
    } else {
        return true;
    }

}


module.exports = {
    checkValidity,
    deleteOldPriceLists,
    insertPriceList
}