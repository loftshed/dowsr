"use strict";

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("databaseName");

/*----------------------------------------
| Endpoints for accessing Users Database |
----------------------------------------*/
const userDb = db.collection("users");
/*--------------------------------------*/

//
// Get all users from DB ------>
//

const getUsers = async (req, res) => {
  try {
    await client.connect();
    const allUsers = await userDb.find().toArray();
    allUsers
      ? res.status(200).json({ status: 200, data: allUsers })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

//
// Get a single user from the database - expects ------>
//
// In req.query : 'userId'.
//

const getUser = async ({ query: { userId } }, res) => {
  try {
    await client.connect();
    const returnedUser = await userDb.findOne({ _id: userId });
    returnedUser
      ? res.status(200).json({ status: 200, data: returnedUser })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

//
// Adds a new user to DB - expects user object in req.body------>
//  format:
//  {
//    givenName: "Firstname",
//    surname: "Lastname",
//    street: "123 User St.",
//    city: "Montreal",
//    region: "QC",
//    country: "Canada",
//    email: "email@address.com",
//    phone: "555-555-5555"
//  }
//

const addUser = async ({ body }, res) => {
  try {
    const newId = uuidv4();
    await client.connect();
    const newUser = await userDb.insertOne({
      _id: newId,
      info: body,
      cart: [],
    });
    res.status(201).json({
      status: 201,
      message: "User creation successful.",
      data: { _id: newId, info: body, cart: [] },
    });
  } catch (err) {
    err ? console.log(err) : client.close();
    res.status(500).json({ status: 500, data: body, error: err });
  }
};

/*
Maybe also check if user exists before adding? 
TBD. First explore use of Google Auth or 0Auth
*/

//
// Modify a user object in the database - options ------>
//
// In req.query : 'userId'.
// In req.body  : One or more properties to be changed in the user info object.
//  example:
//  {
//    givenName: "Newname"
//  }
//

const modifyUser = async ({ query: { userId }, body }, res) => {
  try {
    await client.connect();
    const updateResult = await userDb.updateOne(
      { _id: userId },
      { $set: { info: body } }
    );
    updateResult.acknowledged
      ? res.status(200).json({ status: 200, data: updateResult })
      : res.status(500).json({ status: 500, message: "Something went wrong." });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

/*-----------------------------------------------
| End of endpoints for accessing Users Database |
-----------------------------------------------*/

module.exports = {
  addUser,
  getUsers,
  getUser,
  modifyUser,
};
