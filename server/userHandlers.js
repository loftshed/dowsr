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

const addUser = async ({ body }, res) => {
  try {
    console.log(body);
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
      message: "New user added to database.",
      data: { _id: newId, regDate, ...body },
    });
  } catch (err) {
    err ? console.log(err) : client.close();
    res.status(500).json({ status: 500, data: body, error: err });
  }
};

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

const getUser = async ({ query: { email } }, res) => {
  try {
    await client.connect();
    const returnedUser = await userDb.findOne({ email: email });
    returnedUser
      ? res
          .status(200)
          .json({ status: 200, userFound: true, data: returnedUser })
      : res.status(500).json({
          status: 500,
          userFound: false,
          message: "Something went wrong.",
        });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

module.exports = {
  addUser,
  getUsers,
  getUser,
};
