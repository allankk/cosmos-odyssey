const { MongoClient } = require('mongodb');
const CONFIG = require('../config.json');

// Connect to a local mondoDB database:
//let url = `mongodb://${CONFIG.dbHost}:${CONFIG.dbPort}/${CONFIG.dbName}`;

// Connect to a mongoDB Atlas database:
let url;

if (CONFIG.useLocalDB) {
    url = `mongodb://${CONFIG.localDB.dbHost}:${CONFIG.localDB.dbPort}/${CONFIG.dbName}`;
} else {
    url = CONFIG.remoteDBURL;
}

let db;

// connect to the database
const loadDatabase = async () => {
    try {
        const connection = await MongoClient.connect(url);
        db = connection.db(CONFIG.dbName);
    } catch (err) {
        throw err;
    }
}

// returns the database connection
const getDB = () => {
    return db;
}

module.exports = {
    loadDatabase,
    getDB
}