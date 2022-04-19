// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("final");
const userCollection = db.collection("users");

// Add an object to each document in the collection on MongoDB
// The object is called "submissionsByType" and has four keys:
// "water", "toilet", "police", and "hazard"
// Each key should have a number value of 0
// Return the result of this operation
// const addContributionsByType = async () => {
//   try {
//     await client.connect();
//     const result = await userCollection.updateMany(
//       {},
//       {
//         $set: {
//           contributionsByType: {
//             water: 0,
//             toilet: 0,
//             police: 0,
//             hazard: 0,
//           },
//         },
//       }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err.stack);
//   }
//   client.close();
// };
// addContributionsByType();

// Add an empty array to each document in the collection on MongoDB
// The array is called "contributions"
// Return the result of this operation

// const addContributions = async () => {
//   try {
//     await client.connect();
//     const result = await userCollection.updateMany(
//       {},
//       {
//         $set: {
//           contributions: [],
//         },
//       }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err.stack);
//   }
//   client.close();
// };

// addContributions();

// Query MongoDB for the collection "map-pins"
// Find the documents with these filters: "toilet", "water", "police", and "hazard"
// Remove all elements from the "pins" array in these documents
// Return the result of this operation

// const removePins = async () => {
//   try {
//     await client.connect();
//     const result = await db.collection("map-pins").updateMany(
//       {
//         filter: {
//           $in: ["toilet", "water", "police", "hazard"],
//         },
//       },
//       {
//         $set: {
//           pins: [],
//         },
//       }
//     );
//     console.log(result);
//   } catch (err) {
//     console.log(err.stack);
//   }
//   client.close();
// };

// removePins();
