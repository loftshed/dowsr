// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("final");
const pins = db.collection("map-pins");

const batchImport = async () => {
  try {
    await client.connect();
    const db = client.db("final");

    // Connect to the database, retrieve everything in the collection "pins"
    const copyPins = await db.collection("pins").find().toArray();
    console.log(copyPins);
    // then use copyPins to create a new collection called "map-pins"
    const mapPins = db.collection("map-pins");
    // then insert the copyPins into the new collection "map-pins"
    const result = await mapPins.insertMany(copyPins);
    console.log(result);
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
