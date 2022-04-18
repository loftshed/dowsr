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

// First returns a particular user's contributions array
// Next, searches the map-pins collection for all pinIds that match any of the contributions array, then returns those pins.
const getSubmissionsByUsername = async ({ query: { username } }, res) => {
  try {
    await client.connect();
    const { contributions } = await db
      .collection("users")
      .findOne({ username: username });
    const userContributions = await thisCollection
      .find({
        "pins._id": { $in: contributions },
      })
      .toArray();
    // Maps through the array contained in userContributions, and for each element, returns every element from the pins array with a submittedBy value matching the username.
    const userSubmissions = userContributions.map((contribution) =>
      contribution.pins.filter((pin) => pin.submittedBy === username)
    );
    // This entire thing is a bandaid solution because I didn't think of just counting these numbers upon creation.
    // Flattens the array because I'm not sure why it's super wacky rn.
    // TODO: Figure that out
    const flattenedUserSubmissions = userSubmissions.flat();
    // Maps through the array and returns an object with the types as keys and the number of times they are encountered as the values.
    const typeCounts = flattenedUserSubmissions.reduce(
      (accumulator, currentIndex) => {
        accumulator[currentIndex.type]
          ? accumulator[currentIndex.type]++
          : (accumulator[currentIndex.type] = 1);
        return accumulator;
      },
      {}
    );
    res.status(200).json({
      status: 200,
      submissions: userSubmissions.flat(),
      submissionsByType: typeCounts,
      message: "Successfully retrieved user contributions.",
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
        ? `Pin with id '${pinId}' rejected. Pin has been removed from the database.`
        : `Pin with id '${pinId}' approved. Pin is now visible to the public.`,
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
    const pendingReview = await thisCollection
      .find({
        "pins.pendingReview": true,
      })
      .toArray();

    // TODO: In retrospect I should have just put all of the documents directly into the top level of the collection in MongoDB and then filtered them out here. Time is tight now tho we'll see. Band-aid solution for now.
    let returnedPendingItems = [];
    pendingReview.map((contribution) =>
      returnedPendingItems.push(
        contribution.pins.filter((pin) => pin.pendingReview === true)[0]
      )
    );
    res.status(200).json({
      status: 200,
      pendingReview: returnedPendingItems,
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

// Retrieves everything from the map-pins collection in the database.
const getAllPins = async (req, res) => {
  try {
    await client.connect();
    const allPins = await thisCollection.find({}).toArray();
    res.status(200).json({
      status: 200,
      allPins: allPins,
      message: "Successfully retrieved all pins.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Toggles liking/disliking a pin. Takes userId, pinId, and liked in the query.
// If liked is true, the userId is added to the likedByIds array.
// If the 'liked' parameter is not included in the query, the userId is added to the dislikedByIds array.
// If the user clicks like or dislike on a pin that they have already liked or disliked, respectively, the userId is removed from that array.
// Returns the updated pin.
const toggleLikePin = async ({ query: { userId, pinId, liked } }, res) => {
  try {
    await client.connect();
    let updatedPin;
    let actionTaken;
    if (liked) {
      actionTaken = "liked";
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        {
          $addToSet: { "pins.$.likedByIds": userId },
          $pull: { "pins.$.dislikedByIds": userId },
        }
      );
      const { modifiedCount } = updatedPin;
      if (!modifiedCount) {
        actionTaken = "unliked";
        updatedPin = await thisCollection.updateOne(
          { "pins._id": pinId },
          { $pull: { "pins.$.likedByIds": userId } }
        );
      }
    } else {
      actionTaken = "disliked";
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        {
          $addToSet: { "pins.$.dislikedByIds": userId },
          $pull: { "pins.$.likedByIds": userId },
        }
      );
      const { modifiedCount } = updatedPin;
      if (!modifiedCount) {
        actionTaken = "undisliked";
        updatedPin = await thisCollection.updateOne(
          { "pins._id": pinId },
          { $pull: { "pins.$.dislikedByIds": userId } }
        );
      }
    }
    res.status(200).json({
      status: 200,
      updatedPin: updatedPin,
      success: true,
      action: actionTaken,
      message: `Successfully ${actionTaken} pin.`,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

module.exports = {
  getSubmissionsByUsername,
  getSubmissionsPendingReview,
  getOnePin,
  getAllPins,
  getPinsOfType,
  submitNewPin,
  moderatePin,
  modifyPin,
  deletePin,
  toggleLikePin,
};
