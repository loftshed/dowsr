// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { v4: uuidv4 } = require("uuid");
const { shops } = require("./mockdata/data/shop_data"); // require data file
const { deps } = require("./mockdata/data/dep_data"); // require data file
const { cafes } = require("./mockdata/data/cafe_data"); // require data file
const userData = require("./mockdata/data/user_data");

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let pins = [];

rearrangeData();

const mapPins = [
  { _id: uuidv4(), filter: "bike-shops", pins: [] },
  { _id: uuidv4(), filter: "deps", pins: [] },
  { _id: uuidv4(), filter: "cafes", pins: [] },
  { _id: uuidv4(), filter: "water", pins: [] },
  { _id: uuidv4(), filter: "toilet", pins: [] },
  { _id: uuidv4(), filter: "popo", pins: [] },
  { _id: uuidv4(), filter: "hazards", pins: [] },
];
// const mapPins = { _id: uuidv4(), filter: "cafes", pins: [] };

const batchImport = async () => {
  try {
    await client.connect();
    // set db & collection name
    const db = client.db("final");
    const createPinCollection = await db
      .collection("map-pins")
      .insertMany(mapPins);
    const createUserCollection = await db
      .collection("users")
      .insertMany(userData);

    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
