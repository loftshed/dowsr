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

http.listen(8080, () => console.log("listening on http://localhost:8080"));

/*----------
| handlers |
-----------*/
const {
  addUser, // Adds a new user to the DB.
  getUser, // Returns a single user.
  modifyUser, // Modifies a user.
  removeUser, // Removes a user from the DB.
  addPinToUserContributions, // Pushes a newly created pin to the creator's contributions array.

  toggleFollowUser, // Toggles one user following/unfollowing another.
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
  modifyPin, // Modifies the details of a pin.
  deletePin, // Deletes a pin from the DB.
  getSubmissionsByUsername, // Gets all submissions by a given user.
  getSubmissionsPendingReview, // Gets all submissions pending review.
  getAllPins, // Gets all pins in the DB.
  getPinsOfType, // Gets all pins of a given type.
  getOnePin, // Gets a single pin by its ID.
  toggleLikePin, // Likes or dislikes a pin.
} = require("./handlers/mappingHandlers");

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(cors());

/*-----------
| endpoints |
-----------*/
// user endpoints
app.post("/api/add-user", addUser); // working
app.get("/api/get-user", getUser); // working
app.get("/api/get-user/:username", getUser); // working

app.patch("/api/modify-user", modifyUser); // working
app.patch("/api/:username/add-contribution", addPinToUserContributions); // working
app.delete("/api/remove-user", removeUser); // working
app.patch("/api/toggle-follow", toggleFollowUser);

// messaging endpoints
app.post("/api/new-thread", newThread); // working
app.patch("/api/modify-thread", modifyThread); // working
app.get("/api/get-thread", getOneThread); // working
app.get("/api/get-user-threads", getUserThreads); // working
app.get("/api/get-all-threads", getAllThreads); // working
app.patch("/api/delete-thread", deleteThreadForUser); // working
app.patch("/api/delete-thread-permanently", deleteThreadPermanently); // working

// mapping endpoints
app.get("/api/get-submissions", getSubmissionsByUsername); // working
app.get("/api/get-pending-review", getSubmissionsPendingReview); // working
app.get("/api/get-pins", getPinsOfType); // working
app.get("/api/get-pin", getOnePin); // working
app.get("/api/get-pins/all", getAllPins); // working
app.patch("/api/submit-pin", submitNewPin); // working
app.patch("/api/modify-pin", modifyPin); // working
app.patch("/api/moderate-pin", moderatePin); // working
app.patch("/api/delete-pin", deletePin); // working
app.patch("/api/toggle-like", toggleLikePin); // working!!!!!!!!!!!!!!!!!!

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

module.exports = { io };
