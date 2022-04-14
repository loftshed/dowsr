"use strict";

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("final");

/*----------------------------------------
| Endpoints for accessing Users Database |
----------------------------------------*/
const thisCollection = db.collection("map-pins");
/*--------------------------------------*/

const getPinsOfType = async ({ query: { filter } }, res) => {
  try {
    await client.connect();
    const { _id, pins } = await thisCollection.findOne({ filter: filter });
    res.status(200).json({
      status: 200,
      filter: filter,
      filter_id: _id,
      pins: pins,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const submitNewPin = async ({ body }, res) => {
  try {
    await client.connect();
    console.log(body);
    res.status(200).json({
      status: 200,
      submission: body,
      message: "hullo theree",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

module.exports = {
  getPinsOfType,
  submitNewPin,
};
