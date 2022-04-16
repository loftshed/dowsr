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

// Retrieves all pins matching the filter sent in the query string.
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

// Submits a new pin to the database.
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
    // Creating the new pin in the database.
    const submissionResult = await thisCollection.updateOne(
      { filter: newPin.type },
      { $push: { pins: newPin } }
    );
    // Pushing the ID of the new pin to the 'contributions' array of the user that submitted it.
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
    // Uses array.find to search returnedPins for elements with a submittedBy property matching submittedBy.

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

// In query, expects a pinId, and approved
// To accept, approved=true. To reject, leave "approved" out completely.
// After a pin has been approved, pendingReview will be set to false, making the pin visible to the public.
// If a pin is rejected, it will be removed from the database.
const moderatePin = async ({ query: { pinId, approved } }, res) => {
  try {
    await client.connect();
    let updatedPin;
    if (!approved)
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        { $pull: { pins: { _id: pinId } } }
      );
    if (approved) {
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        { $set: { "pins.$.pendingReview": false } }
      );
    }
    res.status(200).json({
      status: 200,
      updatedPin: updatedPin,
      message: !approved
        ? "Pin rejected. Pin has been removed from the database."
        : "Pin approved. Pin is now visible to the public.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Modifies the details of a pin with a particular ID
const modifyPin = async ({ query: { pinId }, body: { modification } }, res) => {
  try {
    await client.connect();
    const updatedPin = await thisCollection.updateOne(
      { "pins._id": pinId },
      { $set: { "pins.$": modification } }
    );
    res.status(200).json({
      status: 200,
      updatedPin: updatedPin,
      message: "Pin successfully modified.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Deletes a pin with a particular ID from the database.
const deletePin = async ({ query: { pinId } }, res) => {
  try {
    await client.connect();
    const deletedPin = await thisCollection.updateOne(
      { "pins._id": pinId },
      { $pull: { pins: { _id: pinId } } }
    );
    res.status(200).json({
      status: 200,
      deletedPin: deletedPin,
      message: "Pin successfully deleted.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Returns all submissions pending review from the database.
const getSubmissionsPendingReview = async (req, res) => {
  try {
    await client.connect();
    const pendingReview = await thisCollection.find({
      "pins.pendingReview": true,
    });
    res.status(200).json({
      status: 200,
      pendingReview: pendingReview,
      message: "Successfully retrieved all submissions pending review.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Gets a specific pin from the database.
// Feels like not the best way to do this, but it works.
const getOnePin = async ({ query: { pinId } }, res) => {
  try {
    await client.connect();
    // First, searches the DB for the collection of pins containing the pinId sent in the query string.
    const returnedPins = await thisCollection.findOne({
      "pins._id": pinId,
    });
    const { pins } = returnedPins;
    // Then uses array.find to search returnedPin.pins for a pin with an id matching the pinId parameter.
    const foundPin = pins.find((pin) => pin._id === pinId);
    res.status(200).json({
      status: 200,
      foundPin: foundPin,
      message: "Successfully retrieved pin.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

module.exports = {
  getSubmissionsByUsername,
  getSubmissionsPendingReview,
  getOnePin,
  getPinsOfType,
  submitNewPin,
  moderatePin,
  modifyPin,
  deletePin,
};
