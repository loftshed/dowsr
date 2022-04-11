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
const userDb = db.collection("users");
/*--------------------------------------*/

// Adds a new user to MongoDB.
// In the body, expects a user object to be sent in JSON format.
// An ID and a registration date will be inserted into the object by the backend upon new user creation.

const addUser = async ({ body }, res) => {
  try {
    const newId = uuidv4();
    const regDate = dayjs().format();
    await client.connect();
    const newUser = await userDb.insertOne({
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
// Takes one of two parameters in query, depending on your request.
// If you wish to return a single user, query key should be "email", and the value should be the user's email address.
// If you wish to return all users, query key should be "all," with bool value "true".

const getUser = async ({ query: { id, email, all } }, res) => {
  try {
    await client.connect();
    let returnedUsers;
    const searchBy = email ? { email: email } : { _id: id };
    all
      ? (returnedUsers = await userDb.find().toArray())
      : (returnedUsers = await userDb.findOne(searchBy));
    returnedUsers
      ? res
          .status(200)
          .json({ status: 200, userFound: true, data: returnedUsers })
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
    const modifiedUser = await userDb.updateOne(
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

const removeUser = async ({ query: { email } }, res) => {
  try {
    await client.connect();
    const { acknowledged, deletedCount } = await userDb.deleteOne({
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

module.exports = {
  addUser,
  getUser,
  modifyUser,
  removeUser,
};
