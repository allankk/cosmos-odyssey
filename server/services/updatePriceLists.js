const priceListsAPI = require('../api/priceLists');
const priceListsDB = require('../database/priceLists');

// compare current time to the expiry date every 1000ms. If pricelist is expired, retrieve a new one.
const compareDates = (expiryDate) => {
    const interval = setInterval(function() {
        let currentDate = new Date();
    
        if (currentDate > expiryDate) {
            console.log('price list expired, retrieving new one');
            priceListsAPI.getNewPriceList();
            clearInterval(interval);

            // Start comparing again
            setTimeout(function() {
                checkPriceListValidity();
            }, 2000);
        }
    }, 1000);
}

// get the expiry date of the latest price list and compare the times
const checkPriceListValidity = async () => {
    const latestPriceList = await priceListsAPI.getLatestPriceList();
    let expiryDate = new Date(latestPriceList.validUntil);
    compareDates(expiryDate);
}

module.exports = {
    checkPriceListValidity
}
