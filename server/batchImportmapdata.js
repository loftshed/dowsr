// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { v4: uuidv4 } = require("uuid");
const { shops } = require("./shop_data"); // require data file

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bikeShops = [];

const rearrangeData = () => {
  shops.forEach(
    ({
      name,
      site,
      type,
      phone,
      street,
      full_address,
      latitude,
      longitude,
      description,
    }) => {
      const shopObj = {
        _id: uuidv4(),
        latitude,
        longitude,
        name,
        phone,
        site,
        type,
        street,
        full_address,
        description,
        users_vouched: [],
      };
      bikeShops.push(shopObj);
    }
  );
  console.log(bikeShops);
};

rearrangeData();

const mapPins = { _id: uuidv4(), filter: "bike-shops", pins: bikeShops };

const batchImport = async () => {
  try {
    await client.connect();
    // set db & collection name
    const db = client.db("final");
    const result = await db.collection("map-pins").insertOne(mapPins);
    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
