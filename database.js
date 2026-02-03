const {MongoClient} = require('mongodb')

let client;
let db;

async function connect() {
    if (db) return db

    client = new MongoClient(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await client.connect();
    db = client.db();
    console.log("Connected to Mongo")
    return db
}

module.exports = connect;