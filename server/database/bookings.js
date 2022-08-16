const db = require('./connection').getDB();

// inserts a price list to the database into the collection 'priceLists'
const insertBooking = async (user) => {
    await db.collection("Bookings").updateOne(
        { firstName: user.firstName, lastName: user.lastName },
        { $push: {bookings: user.bookings}},
        function(err, res) {
            if (err) throw err;
            updateTotalquotes()
            console.log(`booking added for ${user.firstName} ${user.lastName}`);
        }
    )
}

// initializes a new person document in the collection.
const createPerson = (user) => {
    db.collection("Bookings").insertOne({
        firstName: user.firstName,
        lastName: user.lastName,
        bookings: [user.bookings],
        totalPrice: user.bookings.provider.price,
        totalTravelTime: user.bookings.provider.flightTime

    }, function(err, res) {
        if (err) throw err;
        console.log(`${user.firstName} ${user.lastName} inserted to the database`);
    })
}

// returns all the bookings in the database
const getAllBookings = async () => {
    try {
        result = await db.collection("Bookings").find().toArray();
    } catch (err) {
        console.log(err);
    }

    return result;
}

// returns an user from the Bookings collection alongside its bookings based on the input name
const getBookings = async (firstName, lastName) => {
    let user 

    try {
        user = await db.collection("Bookings").findOne({
            "firstName": firstName,
            "lastName": lastName
        })
    } catch (err) {
        console.log(err);
    }

    return user;
}

// delete bookings with a given pricelist ID
const deleteOldBookings = async (priceListID) => {
    console.log(`deleting bookings with the priceListID of ${priceListID}`);

    await db.collection("Bookings").updateMany(
        { },
        { $pull: { bookings: {priceListID: priceListID}}}
    );
    
    deleteOldUsers();
    updateTotalquotes();
}

// deletes users that have no more bookings from the database
const deleteOldUsers = () => {
    try {
        db.collection("Bookings").deleteMany( { "bookings": [] } );
    } catch (e) {
        print (e);
    };
}


const updateTotalquotes = async () => {
    db.collection("Bookings").find().forEach( user => {
        let totalPrice = 0;
        let totalTravelTime = 0;

        user.bookings.forEach(booking => {
            totalPrice += booking.provider.price;
            totalTravelTime += booking.provider.flightTime;
        })

        db.collection("Bookings").updateOne(
            { _id: user._id },
            { $set: { totalPrice: totalPrice, totalTravelTime: totalTravelTime } }
        );
    })
}

module.exports = {
    updateTotalquotes,
    getAllBookings,
    deleteOldBookings,
    createPerson,
    getBookings,
    insertBooking
}

