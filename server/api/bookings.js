const bookingsDB = require('../database/bookings');
const db = require('../database/priceLists');

// handles a POST request to book a flight
const postBookFlight = async (user) => {
    // checks if the user is trying to book with the latest pricelist that is in the database
    let isValid = await db.checkValidity(user.bookings.priceListID);

    if (isValid) {
        bookingsDB.getBookings(user.firstName, user.lastName).then(result => {
            if (result == null) {
                bookingsDB.createPerson(user);
            } else {
                bookingsDB.insertBooking(user);
            }
        });
    }
    return isValid;
}

// returns all bookings in the database
const getAllBookings = async () => {
    let result = bookingsDB.getAllBookings();
    return result;
}

module.exports = {
    postBookFlight,
    getAllBookings
}