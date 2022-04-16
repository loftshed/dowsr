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
    const pinId = uuidv4();
    const newPin = {
      _id: pinId,
      ...body,
      submitted: currentTime,
      pendingReview: true,
    };
    await client.connect();
    // Submits the new pin to the database.
    const submissionResult = await thisCollection.updateOne(
      { filter: newPin.type },
      { $push: { pins: newPin } }
    );
    // Pushes the ID of the new pin to the 'contributions' array of the user that submitted it.
    const updatedUser = await db
      .collection("users")
      .updateOne(
        { username: newPin.submittedBy },
        { $push: { contributions: pinId } }
      );
    res.status(200).json({
      status: 200,
      submission: newPin,
      success: true,
      submissionResult: submissionResult,
      updatedUser: updatedUser,
      message: "Pin submission successful. Awaiting review.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Retrieves all pins submitted by a given username
const getSubmissionsByUsername = async ({ query: { submittedBy } }, res) => {
  try {
    await client.connect();
    const returnedPins = await thisCollection
      .find({ "pins.submittedBy": submittedBy })
      .toArray();
    // Searches through documents in collection "map-pins" in MongoDB database "final" and returns any array elements that have a field with a value matching the submittedBy parameter.
    res.status(200).json({
      status: 200,
      message: "Successfully retrieved submissions by username.",
      pins: returnedPins,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// After a pin has been approved, pendingReview will be set to false, making the pin visible to the public. The user will be notified via email and in their notifications panel. The user's contibutions count will be incremented by 1.

module.exports = {
  getSubmissionsByUsername,
  getPinsOfType,
  submitNewPin,
};
