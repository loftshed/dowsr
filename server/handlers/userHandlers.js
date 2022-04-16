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
| Endpoints for accessing Users Database |
----------------------------------------*/
const thisCollection = db.collection("users");
/*--------------------------------------*/

// Adds a new users to the DB.
//
// In req.body, expects a user object to be sent in JSON format.
// An ID and a registration date will be inserted into the object by the backend upon new user creation.

const addUser = async ({ body }, res) => {
  try {
    const newId = uuidv4();
    const regDate = dayjs().format();
    await client.connect();
    const newUser = await thisCollection.insertOne({
      _id: newId,
      regDate: regDate,
      ...body,
    });
    res.status(201).json({
      status: 201,
      success: true,
      message: `New user with email '${body.email}' successfully added to the database.`,
      data: { _id: newId, regDate, ...body },
    });
  } catch (err) {
    err ? console.log(err) : client.close();
    res
      .status(500)
      .json({ status: 500, success: false, data: body, error: err });
  }
};

// Returns users stored in MongoDB.
// If you wish to return a single user valid queries are:
//
// Through URL query (?id=, ?email=) ---
// "email" - value should be the user's email address.
// "id" - value should be the user's UUID.
// Or, through URL params (:username) ---
// "username" - value should be the user's username.

const getUser = async ({ query: { id, email }, params: { username } }, res) => {
  try {
    await client.connect();
    let users;
    if (id) users = await thisCollection.findOne({ _id: id });
    if (email) users = await thisCollection.findOne({ email: email });
    if (username) users = await thisCollection.findOne({ username: username });
    if (!id && !email && !username)
      users = await thisCollection.find().toArray();
    users
      ? res.status(200).json({ status: 200, userFound: true, data: users })
      : res.status(500).json({
          status: 500,
          userFound: false,
          message:
            "Your query did not return any users. For more info, refer to documentation.",
        });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const modifyUser = async ({ query: { email }, body }, res) => {
  try {
    await client.connect();
    const modifiedUser = await thisCollection.updateOne(
      { email: email },
      { $set: body }
    );
    modifiedUser
      ? res
          .status(200)
          .json({ status: 200, userFound: true, data: modifiedUser })
      : res.status(500).json({
          status: 500,
          userFound: false,
          message:
            "Your query did not return any users. For more info, refer to documentation.",
        });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const removeUser = async ({ query: { id, email } }, res) => {
  try {
    await client.connect();
    const { acknowledged, deletedCount } = await thisCollection.deleteOne({
      email: email,
    });
    if (deletedCount) {
      console.log({
        message: `${deletedCount} user account deleted successfully.`,
      });
      res.status(204).json({ status: 204 });
    } else {
      res.status(500).json({ status: 500, message: "ID not found." });
    }
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Push a pin ID to the user's contributions array.
// Takes a username and a pin ID as parameters.
// const addToContributions = async (
//   { params: { username }, query: { pinId } },
//   res
// ) => {
//   try {
//     await client.connect();
//     const user = await thisCollection.findOne({ username: username });
//     if (user) {
//       const updatedUser = await thisCollection.updateOne(
//         { username: username },
//         { $push: { contributions: pinId } }
//       );
//       updatedUser
//         ? res
//             .status(200)
//             .json({ status: 200, userFound: true, data: updatedUser })
//         : res.status(500).json({
//             status: 500,
//             userFound: false,
//             message: "Something went wrong.",
//           });
//     }
//   } catch (err) {
//     err ? console.log(err) : client.close();
//   }
// };

module.exports = {
  addUser,
  getUser,
  modifyUser,
  removeUser,
};
