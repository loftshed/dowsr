// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { v4: uuidv4 } = require("uuid");
const { shops } = require("./data/mockShopData"); // require data file
const { deps } = require("./data/mockDepData"); // require data file
const { cafes } = require(".//data/mockCafeData"); // require data file

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let pins = [];

const filter = "deps";

const rearrangeData = (filter) => {
  deps.forEach(
    ({
      name,
      site,
      type,
      phone,
      full_address,
      latitude,
      longitude,
      description,
    }) => {
      const pinObj = {
        _id: uuidv4(),
        latitude: +latitude,
        longitude: +longitude,
        desc: name,
        phone,
        site,
        type: "deps",
        submittedBy: "dowsr",
        pendingReview: false,
        address: full_address,
        users_vouched: [],
        likedByIds: [],
        dislikedByIds: [],
      };
      pins.push(pinObj);
    }
  );
  console.log(pins);
};

rearrangeData();

const mapPins = { _id: uuidv4(), filter: "deps", pins: pins };

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
