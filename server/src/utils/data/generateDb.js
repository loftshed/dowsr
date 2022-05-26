// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { v4: uuidv4 } = require("uuid");
// const { shops } = require("./mockdata/data/shop_data"); // require data file
// const { deps } = require("./mockdata/data/dep_data"); // require data file
// const { cafes } = require("./mockdata/data/cafe_data"); // require data file
// const userData = require("./mockdata/data/user_data");

// TODO: Currently this does not

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let pins = [];

const pinTypes = [
  { _id: uuidv4(), filter: "shops", pins: [] },
  { _id: uuidv4(), filter: "deps", pins: [] },
  { _id: uuidv4(), filter: "cafes", pins: [] },
  { _id: uuidv4(), filter: "water", pins: [] },
  { _id: uuidv4(), filter: "toilet", pins: [] },
  { _id: uuidv4(), filter: "police", pins: [] },
  { _id: uuidv4(), filter: "hazard", pins: [] },
];
console.log(pinTypes);

const batchImport = async () => {
  try {
    await client.connect();
    // set db & collection name
    const db = client.db("final");
    const createPinCollection = await db
      .collection("map-pins")
      .insertMany(mapPins);
    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
