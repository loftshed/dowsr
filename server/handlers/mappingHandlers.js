"use strict";

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const dayjs = require("dayjs");

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("final");

/*----------------------------------------
| Endpoints for accessing Mapping Database |
----------------------------------------*/
const thisCollection = db.collection("map-pins");
/*--------------------------------------*/

const getPinsOfType = async ({ query: { filter } }, res) => {
  try {
    console.log(filter);
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
    const currentTime = dayjs().format();
    const newPin = {
      ...body,
      _id: uuidv4(),
      submitted: currentTime,
      pendingReview: true,
    };
    await client.connect();
    const submissionResult = await thisCollection.updateOne(
      { filter: newPin.type },
      { $push: { pins: newPin } }
    );
    res.status(200).json({
      status: 200,
      submission: newPin,
      success: true,
      result: submissionResult,
      message: "Pin submission successful. Awaiting review.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// After a pin has been approved, pendingReview will be set to false, making the pin visible to the public. The user will be notified via email and in their notifications panel. The user's contibutions count will be incremented by 1.

module.exports = {
  getPinsOfType,
  submitNewPin,
};
