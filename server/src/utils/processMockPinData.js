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

// require pindata.json
const data = require("./mockdata/pindata.json");

// Processes mock pin data generated with Mockaroo.
const police = [];
const hazard = [];
const toilet = [];
const water = [];

for (let i = 0; i < data.length; i++) {
  if (data[i].type === "police") police.push(data[i]);
  if (data[i].type === "hazard") hazard.push(data[i]);
  if (data[i].type === "toilet") toilet.push(data[i]);
  if (data[i].type === "water") water.push(data[i]);
}

const addMockPins = async () => {
  try {
    await client.connect();
    const policeResult = await pins.updateOne(
      { filter: "police" },
      { $set: { pins: police } }
    );
    const hazardResult = await pins.updateOne(
      { filter: "hazard" },
      { $set: { pins: hazard } }
    );
    const toiletResult = await pins.updateOne(
      { filter: "toilet" },
      { $set: { pins: toilet } }
    );
    const waterResult = await pins.updateOne(
      { filter: "water" },
      { $set: { pins: water } }
    );
  } catch (error) {
    err ? console.log(err) : client.close();
  }
};

addMockPins();
