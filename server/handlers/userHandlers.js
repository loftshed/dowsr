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
const addPinToUserContributions = async (
  { params: { username }, query: { pinId } },
  res
) => {
  try {
    await client.connect();
    const user = await thisCollection.findOne({ username: username });
    if (user) {
      const updatedUser = await db
        .collection("users")
        .updateOne({ username: username }, { $push: { contributions: pinId } });
      updatedUser
        ? res
            .status(200)
            .json({ status: 200, userFound: true, data: updatedUser })
        : res.status(500).json({
            status: 500,
            userFound: false,
            message: "Something went wrong.",
          });
    }
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Follows or unfollows another user. Requires userId and targetUserId in the query.
// If the optional third parameter "follow" is included, userId will follow targetUserId.
// If the optional third parameter "follow" is not included, userId will unfollow targetUserId.
// When a user follows another user, their userId is pushed into the target user's followers array, and the target user's userId is pushed into the initiating user's following array, and vice versa. If a user makes a redundant request it is ignored.
// Try to make this way more DRY!!!
// Maybe take userIds in the query and then assign them to variables dynamically in the function based on whether or not the "follow" parameter is included.
const toggleFollowUser = async (
  { query: { userId, targetUserId, follow } },
  res
) => {
  try {
    await client.connect();
    const user = await thisCollection.findOne({ _id: userId });
    const targetUser = await thisCollection.findOne({ _id: targetUserId });
    // If the user already follows the target user that they are requesting to follow, ignore the request.
    if (user.following.includes(targetUserId) && follow) {
      res.status(200).json({
        status: 200,
        message: "You are already following this user.",
      });
    } else if (user && targetUser) {
      if (follow) {
        const updatedFollowedUser = await db
          .collection("users")
          .updateOne({ _id: targetUserId }, { $push: { followers: userId } });
        const updatedFollowingUser = await db
          .collection("users")
          .updateOne({ _id: userId }, { $push: { following: targetUserId } });
        updatedFollowingUser
          ? res.status(200).json({
              status: 200,
              userFound: true,
              data: [updatedFollowingUser, updatedFollowedUser],
              message: `You are now following userId ${targetUserId}.`,
            })
          : res.status(500).json({
              status: 500,
              userFound: false,
              message: "Something went wrong.",
            });
      } else {
        if (!user.following.includes(targetUserId) && !follow) {
          res.status(200).json({
            status: 200,
            message: "You cannot unfollow a user that you are not following.",
          });
        } else {
          const updatedFollowedUser = await db
            .collection("users")
            .updateOne({ _id: targetUserId }, { $pull: { followers: userId } });
          const updatedFollowingUser = await db
            .collection("users")
            .updateOne({ _id: userId }, { $pull: { following: targetUserId } });
          updatedFollowingUser
            ? res.status(200).json({
                status: 200,
                userFound: true,
                data: [updatedFollowingUser, updatedFollowedUser],
                message: `You are no longer following userId ${targetUserId}.`,
              })
            : res.status(500).json({
                status: 500,
                userFound: false,
                message: "Something went wrong.",
              });
        }
      }
    }
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Checks the database to see if submitted ID has a bool field of 'isAdmin' set to true.
const checkAdminStatus = async ({ query: { id } }, res) => {
  // try {
  //   await client.connect();
  //   const user = await thisCollection.findOne({ _id: id });
  //   console.log(user);
  //   if (user) {
  //     user.isAdmin === true
  //       ? res.status(200).json({ status: 200, isAdmin: true })
  //       : res.status(200).json({ status: 200, isAdmin: false });
  //   }
  // } catch (err) {
  //   err ? console.log(err) : client.close();
  // }
};

module.exports = {
  addUser,
  getUser,
  modifyUser,
  removeUser,
  addPinToUserContributions,
  toggleFollowUser,
  checkAdminStatus,
};
