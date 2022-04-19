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
const collection = db.collection("map-pins");

// // Find a document with a field "filter" that matches the provided filter.
// // Map through that document's pins array, and in each object contained inside:
// // 1. Delete the "description" field.
// // 2. Add a new field "submittedBy" with the value "dowsr".
// // 3. Add a field "likedByIds" with an empty array.
// // 4. Add a field "dislikedByIds" with an empty array.
// // 5. Add a field "pendingReview" with boolean value of false.
// // 6. Change the key "name" to "desc".
// // 7. Remove the key "street".
// // 8. Change the key "full_address" to "address".
// // 9. Add a field "hours" with value of null.
// // 10. Change the fields "latitude" and "longitude" from strings to numbers.
// // 11. Remove the field "users_vouched".
// // Update the document in the database.

// const batchModifyField = async (filter) => {
//   try {
//     await client.connect();
//     const db = client.db("final");
//     const result = await db.collection("map-pins").findOne({ filter });
//     const { pins } = result;
//     const modifiedPins = pins.map((pin) => {
//       const {
//         description,
//         name,
//         street,
//         full_address,
//         latitude,
//         longitude,
//         users_vouched,
//       } = pin;
//       const modifiedPin = {
//         description,
//         submittedBy: "dowsr",
//         likedByIds: [],
//         dislikedByIds: [],
//         pendingReview: false,
//         desc: name,
//         address: full_address,
//         hours: null,
//         latitude: Number(latitude),
//         longitude: Number(longitude),
//         users_vouched,
//       };
//       return modifiedPin;
//     });
//     const modifiedResult = {
//       _id: result._id,
//       filter: result.filter,
//       pins: modifiedPins,
//     };
//     await db
//       .collection("map-pins")
//       .updateOne({ filter }, { $set: modifiedResult });
//     console.log("Batch operation completed.");
//   } catch (error) {
//     console.log(error);
//   }
// };

// Find a document with a field "filter" that matches the provided filter.
// Map through that document's pins array, and in each object contained inside, use $pull to remove the "description" field.
// Update the document in the database.

const batchModifyField = async (filter) => {
  try {
    await client.connect();
    const db = client.db("final");
    const result = await db.collection("map-pins").findOne({ filter });
    const { pins } = result;
    const modifiedPins = pins.map((pin) => {
      const { description } = pin;
      const modifiedPin = {
        $pull: { description },
      };
      return modifiedPin;
    });
    const modifiedResult = {
      _id: result._id,
      filter: result.filter,
      pins: modifiedPins,
    };
    await db
      .collection("map-pins")
      .updateOne({ filter }, { $set: modifiedResult });
    console.log("Batch operation completed.");
  } catch (error) {
    console.log(error);
  }
};

batchModifyField("cafes");
