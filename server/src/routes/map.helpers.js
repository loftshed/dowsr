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

// potential clue to what is happening here
// {
// 	"status": 200,
// 	"allPins": [
// 		{
// 			"_id": "dd1c6b4d-5b61-4c31-8fdf-7e52c11ae3ac",
// 			"filter": "water",
// 			"pins": [
// 				{
// 					"_id": "239beea0-1527-4871-9579-db251b8a5725",
// 					"type": "water",
// 					"latitude": 45.540136863757084,
// 					"longitude": -73.60024044865756,
// 					"hours": "123",
// 					"address": "6526 Rue Chambord, Montréal, Quebec H2G 3B9, Canada",
// 					"desc": "123",
// 					"submittedBy": "dendytrewolla",
// 					"submittedById": "9379e50c-856d-4049-a0cf-a91d38d7b1a3",
// 					"likedByIds": [],
// 					"dislikedByIds": [],
// 					"submitted": "2022-04-20T00:26:04-04:00",
// 					"pendingReview": false
// 				}
// 			],
// 			"contributions": [
// 				"35fdbc87-eb8b-4b39-8274-861005656175",
// 				"8db1573c-7ad4-4c55-8fa8-be032950be58",
// 				"8db1573c-7ad4-4c55-8fa8-be032950be58",
// 				"76671b88-46bd-4e6a-922a-191469491c9c",
// 				"76671b88-46bd-4e6a-922a-191469491c9c",
// 				"76671b88-46bd-4e6a-922a-191469491c9c",
// 				"ebec1042-130f-44e4-bbb4-a3e23a45d831",
// 				"49b5e980-3595-4283-9ba1-d6a8c187d1e1",
// 				"8db1573c-7ad4-4c55-8fa8-be032950be58",
// 				"35fdbc87-eb8b-4b39-8274-861005656175"
// 			],
// 			"contributionsByType": {
// 				"undefined": 6
// 			}
// 		},

// Submits a new pin to the database.
const submitNewPin = async ({ body }, res) => {
  try {
    await client.connect();
    const currentTime = dayjs().format();
    const pinId = uuidv4();
    const newPin = {
      _id: pinId,
      ...body,
      submitted: currentTime,
      pendingReview: true,
    };
    console.log(body);
    // Creating the new pin in the database.
    const submissionResult = await thisCollection.updateOne(
      { filter: newPin.type },
      { $push: { pins: newPin } }
    );
    // Adds the pin to a pending array.
    const pendingResult = await thisCollection.updateOne(
      { filter: "pending" },
      { $push: { pins: newPin } }
    );

    res.status(200).json({
      status: 200,
      submission: newPin,
      success: true,
      submissionResult: submissionResult,
      pendingResult: pendingResult,
      message: "Pin submission successful. Awaiting review.",
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// In query, expects a pinId, and 'approved'
// To accept, approved=true. To reject, leave "approved" out completely.
// After a pin has been approved, pendingReview will be set to false, making the pin visible to the public.
// If a pin is rejected, it will be removed from the database.
const moderatePin = async ({ query: { pinId, approved, username } }, res) => {
  try {
    console.log(username);
    await client.connect();
    console.log("pinId = " + pinId);
    console.log("approved = " + approved);
    let updatedPin;
    let updatedUser;
    let updatedUserContributionCounts;
    if (!approved || approved === "false")
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        { $pull: { pins: { _id: pinId } } }
      );
    if (approved) {
      // Set pendingReview to false
      updatedPin = await thisCollection.updateOne(
        { "pins._id": pinId },
        { $set: { "pins.$.pendingReview": false } }
      );
      // Push the pinId to the contributions array of the user that submitted it.
      updatedUser = await db
        .collection("users")
        .updateOne({ username: username }, { $push: { contributions: pinId } });
    }

    // Whether the pin is approved or disapproved it must now be removed from pins array of the pending filter.
    const updatedPending = await thisCollection.updateOne(
      { filter: "pending" },
      { $pull: { pins: { _id: pinId } } }
    );

    res.status(200).json({
      status: 200,
      updatedPin: updatedPin,
      updatedPending: updatedPending,
      updatedUser: updatedUser,
      message: !approved
        ? `Pin with id '${pinId}' rejected. Pin has been removed from the database.`
        : `Pin with id '${pinId}' approved. Pin is now visible to the public.`,
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

// Get pins pending review from the database.
// Optionally, will accept a userId in the query to filter the results by.
const getSubmissionsPendingReview = async ({ query: { userId } }, res) => {
  try {
    await client.connect();
    const { pins } = await thisCollection.findOne({ filter: "pending" });
    const filteredPins = userId
      ? pins.filter((pin) => pin.submittedById === userId)
      : pins;
    res.status(200).json({
      status: 200,
      pendingReview: filteredPins,
      message: "Successfully retrieved pending submissions.",
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
