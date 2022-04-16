"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

/*-----------------
| socket.io stuff |
-----------------*/
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

// Opens a socket connection to the client.
io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.emit("connection", "null");
});

// Emits a message to the client.
io.on("message", (message) => {
  console.log(message);
});

http.listen(8080, () => console.log("listening on http://localhost:8080"));

/*-----------
| handlers |
-----------*/
const {
  addUser, // Adds a new user to the DB.
  getUser, // Returns a single user.
  modifyUser, // Modifies a user.
  removeUser, // Removes a user from the DB.
  addPinToUserContributions, // Pushes a newly created pin to the creator's contributions array.
} = require("./handlers/userHandlers");

const {
  getOneThread, // Gets a single thread by its ID.
  newThread, // Creates a new thread between two users if one doesn't already exist.
  modifyThread, // Modifies a thread. This is used to add a message to a thread.
  getUserThreads, // Gets all threads involving a given user by their userId.
  getAllThreads, // Gets every single thread in the DB.
  deleteThreadForUser, // Deletes one user's copy of a thread.
  deleteThreadPermanently, // Deletes a thread from the DB completely.
} = require("./handlers/messageHandlers");

const {
  submitNewPin, // Submits a new pin to the DB.
  moderatePin, // Moderates a user-submitted pin.
  modifyPin,
  deletePin,
  getSubmissionsByUsername,
  getSubmissionsPendingReview,
  getPinsOfType,
  getOnePin,
} = require("./handlers/mappingHandlers");

app.use(morgan("tiny"));
app.use(express.json()); // this was used in slingair server..  do i need?
app.use(express.static("public")); // requests for static files go to public folder
app.use(helmet());
app.use(cors());

/*-----------
| endpoints |
-----------*/
// user endpoints
app.post("/api/add-user", addUser); // working
app.get("/api/get-user", getUser); // working
app.get("/api/get-user/:username", getUser);
app.patch("/api/modify-user", modifyUser); // working
app.patch("/api/:username/add-contribution", addPinToUserContributions); // working
app.delete("/api/remove-user", removeUser); // working

// messaging endpoints
app.post("/api/new-thread", newThread); // working
app.patch("/api/modify-thread", modifyThread); // working
app.get("/api/get-thread", getOneThread); // working
app.get("/api/get-user-threads", getUserThreads); // working
app.get("/api/get-all-threads", getAllThreads); // working
app.patch("/api/delete-thread", deleteThreadForUser); // working
app.patch("/api/delete-thread-permanently", deleteThreadPermanently); // working

// mapping endpoints
app.get("/api/get-submissions", getSubmissionsByUsername);
app.get("/api/get-pending-review", getSubmissionsPendingReview);
app.get("/api/get-pins", getPinsOfType);
app.get("/api/get-pin", getOnePin);
app.patch("/api/submit-pin", submitNewPin);
app.patch("/api/modify-pin", modifyPin);
app.patch("/api/moderate-pin", moderatePin);
app.patch("/api/delete-pin", deletePin);

/*------------------
| end of endpoints |
------------------*/

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message:
      "404: PEBCAK error occurred during development. Please contact support.",
  });
});

// Sets server to listen with power level over 9000.
app.listen(9001, () => console.log(`Listening on port 9001`));
