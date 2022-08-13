const axios = require('axios');

// Calls the API to get the current price list of space flights and returns the result as a parameter to the callback
const getNewPriceList = async () => {
    const CONFIG = require('../config.json');
    let endpointURL = CONFIG.endpointURL;

    let response = await axios.get(endpointURL);

    // insert the pricelist to the database
    const priceListsDB = require('../database/priceLists');
    await priceListsDB.insertPriceList(response.data);
};

// returns the last price list from the 'priceLists' collection in the database
// if the collection is empty, retrieve and insert a new price list
const getLatestPriceList = async () => {
    let db = require('../database/connection').getDB();
    let result;
    
    try {
        let priceListCount = await db.collection("priceLists").count();

        if (priceListCount == 0) {
            await getNewPriceList();
        }
        result = await db.collection("priceLists").find().limit(1).sort({$natural:-1}).toArray();
    } catch (err) {
        console.log(err);
    }

    return result[0];
}


module.exports = {
    getNewPriceList,
    getLatestPriceList
}