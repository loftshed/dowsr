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

const users = db.collection("users");
const mapping = db.collection("map-pins");
const messages = db.collection("messages");

/*-------------
| for maps db.|
-------------*/

const modifyPinWithId = async ({ query: { filter, id }, body }, res) => {
  try {
    await client.connect();
    const result = await flightsDb.updateOne(
      { filter: filter, "pins._id": id },
      { $set: { "pins.$.name": "JUST TESTING" } }
    );
    res.status(200).json({
      status: 200,
      filter: filter,
      filter_id: _id,
      result: result,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// const modifyPinWithId = async ({ query: { filter, id }, body }, res) => {
//   try {
//     await client.connect();
//     const result = await flightsDb.updateOne(
//       { filter: filter, "pins._id": id },
//       { $set: { "pins.$.name": "JUST TESTING" } }
//     );
//   } catch (err) {
//     err ? console.log(err) : client.close();
//   }
// };

module.exports = {
  modifyPinWithId,
};
