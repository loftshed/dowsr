"use strict";

require("dotenv").config();

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");
const { MONGO_URI } = process.env;
const dayjs = require("dayjs");
const currentTime = dayjs().format();

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = client.db("final");

/*-------------------------------------------
| Endpoints for accessing Messages Database |
-------------------------------------------*/
const msgDb = db.collection("messages");
/*--------------------------------------*/

const newThread = async ({ query: { idA, idB }, body }, res) => {
  try {
    const threadId = uuidv4();
    await client.connect();
    const newThread = {
      _id: threadId,
      users: [idA, idB],
      messages: [{ sent: currentTime, ...body }],
    };
    await msgDb.insertOne(newThread);
    res.status(201).json({
      status: 201,
      message: "New thread created.",
      data: newThread,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
    res.status(500).json({ status: 500, data: newThread, error: err });
  }
};

const getOneThread = async ({ query: { threadId } }, res) => {
  try {
    await client.connect();
    const returnedThread = await msgDb.findOne({ _id: threadId });
    res.status(200).json({
      status: 200,
      threads: returnedThread,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const getUserThreads = async ({ query: { userId } }, res) => {
  try {
    await client.connect();
    const returnedThreads = await msgDb.find({ users: `${userId}` }).toArray();
    res.status(200).json({
      status: 200,
      threads: returnedThreads,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

const modifyThread = async ({ query: { threadId }, body }, res) => {
  try {
    await client.connect();
    const modResult = await msgDb.updateOne(
      { _id: threadId },
      { $push: { messages: { sent: currentTime, ...body } } }
    );
    res.status(200).json({
      status: 200,
      data: modResult,
    });
  } catch (err) {
    err ? console.log(err) : client.close();
  }
};

//TODO: for admin purposes only
const getAllThreads = async (req, res) => {
  try {
    await client.connect();
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
};
