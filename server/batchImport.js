// batchImport function originally created for MongoDB exercises.
const { get } = require("express/lib/response");
const { MongoClient } = require("mongodb");

const { users } = require("./data/userData"); // require data file

require("dotenv").config();
const { MONGO_URI } = process.env;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const batchImport = async () => {
  try {
    await client.connect();
    // set db & collection name
    const db = client.db("final");
    const result = await db.collection("users").insertMany(users);
    console.log("Batch import successful");
  } catch (err) {
    console.log(err.stack);
    console.log("Batch import failed.");
  }
  client.close();
};

batchImport();
