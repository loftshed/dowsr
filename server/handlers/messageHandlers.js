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
const io = require("../index");

/*-------------------------------------------
| Endpoints for accessing Messages Database |
-------------------------------------------*/
const thisCollection = db.collection("messages");
/*--------------------------------------*/

// Creates a new thread with the given userIds, if they don't already have one.
const newThread = async ({ query: { idA, idB }, body }, res) => {
  try {
    const currentTime = dayjs().format();
    const threadId = uuidv4();
    await client.connect();
    // Before creating a new thread, check if the two users are already in a thread.
    const existingThread = await thisCollection.findOne({
      users: { $all: [idA, idB] },
    });

    // If the two users are already in a thread, return that thread.
    if (existingThread) {
      res.status(200).json({
        status: 200,
        message: "Thread already exists.",
        data: existingThread,
      });
      return;
    }

    // If not, create a new thread for those users.
    const newThread = {
      _id: threadId,
      users: [idA, idB],
      lastMsg: currentTime,
      messages: [{ sent: currentTime, ...body }],
    };

    const newThreadResult = await thisCollection.insertOne(newThread);
    res.status(200).json({
      status: 201,
      data: newThreadResult,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
    res.status(500).json({ status: 500, data: newThread, error: err });
  }
};

// Gets a single thread by its ID. ID is sent in the query.
const getOneThread = async ({ query: { threadId } }, res) => {
  try {
    await client.connect();
    const returnedThread = await thisCollection.findOne({ _id: threadId });
    res.status(200).json({
      status: 200,
      threads: returnedThread,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Get all threads involving a given user by their userId
const getUserThreads = async ({ query: { userId } }, res) => {
  try {
    await client.connect();
    const returnedThreads = await thisCollection
      .find({ users: `${userId}` })
      .toArray();
    res.status(200).json({
      status: 200,
      threads: returnedThreads.length > 0 ? returnedThreads : null,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Adds a message to a thread by its ID. ID is sent in the query.
// Body expects a message object with this format:
// { userId: userId, handle: handle, message: message }
//
const modifyThread = async ({ query: { threadId }, body }, res) => {
  try {
    await client.connect();
    const currentTime = dayjs().format();

    // Find the thread by its ID. Push the new message object to the messages array.
    const newMsgResult = await thisCollection.updateOne(
      { _id: threadId },
      { $push: { messages: { sent: currentTime, ...body } } }
    );

    // Update the lastMsg field to the current time.
    const lastMsgResult = await thisCollection.updateOne(
      { _id: threadId },
      { $set: { lastMsg: currentTime } }
    );
    res.status(200).json({
      status: 200,
      data: [newMsgResult, lastMsgResult],
      sentMessage: { sent: currentTime, ...body },
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// "Deletes" a thread by using $pull to remove a userId from the thread's users array.
const deleteThreadForUser = async ({ query: { threadId, userId } }, res) => {
  try {
    await client.connect();
    const result = await thisCollection.updateOne(
      { _id: threadId },
      { $pull: { users: userId } }
    );
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Targets a thread by using its threadId, and deletes if from the database completely.
const deleteThreadPermanently = async ({ query: { threadId } }, res) => {
  try {
    await client.connect();
    const result = await thisCollection.deleteOne({ _id: threadId });
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

// Retrieves every thread in the database.
const getAllThreads = async (req, res) => {
  try {
    await client.connect();
    const allThreads = await thisCollection.find().toArray();
    res.status(200).json({
      status: 200,
      data: allThreads,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

module.exports = {
  newThread,
  getOneThread,
  getAllThreads,
  getUserThreads,
  modifyThread,
  deleteThreadForUser,
  deleteThreadPermanently,
};
