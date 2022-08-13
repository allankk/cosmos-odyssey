const CONFIG = require('../config.json');
const db = require('./connection').getDB();

// create a collection in the database
const initializeCollection = (collectionName) => {
    db.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log(`collection '${collectionName}' created`);
    });
};

// if collection doesn't exist in the database, initalize new collection(s)
const checkIfCollectionsExist = () => {
    CONFIG.dbCollections.forEach(collectionName => {
        db.listCollections({name: collectionName})
            .next(function(err, collinfo) {
                if (!collinfo) {
                    initializeCollection(collectionName);
                }
            })
    })
}

module.exports = { checkIfCollectionsExist }