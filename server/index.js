"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

/*-----------------
| socket.io stuff |
-----------------*/
// const http = require("http").createServer(app);
// const io = require("socket.io")(http, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log(`a user connected ${socket.id}`);
//   socket.emit("connection", "null");
// });

// io.on("sendMsg", (socket) => {
//   socket.emit("howdy", { data: "lol" });
// });

// http.listen(8080, () => console.log("listening on http://localhost:8080"));

/*-----------
| handlers |
-----------*/
const {
  addUser,
  getUser,
  modifyUser,
  removeUser,
} = require("./handlers/userHandlers");

const {
  getOneThread,
  newThread,
  modifyThread,
  getUserThreads,
  getAllThreads,
} = require("./handlers/messageHandlers");

const { getPinsOfType } = require("./handlers/mappingHandlers");

const { modifyPinWithId } = require("./handlers/adminHandlers");

app.use(morgan("tiny"));
app.use(express.json()); // this was used in slingair server..  do i need?
app.use(express.static("public")); // requests for static files go to public folder
app.use(helmet());
app.use(cors());

/*-----------
| endpoints |
-----------*/
// user endpoints
app.post("/api/add-user", addUser);
app.get("/api/get-user", getUser);
app.patch("/api/modify-user", modifyUser);
app.delete("/api/remove-user", removeUser);

// messaging endpoints
app.post("/api/new-thread", newThread);
app.patch("/api/modify-thread", modifyThread);
app.get("/api/get-thread", getOneThread);
app.get("/api/get-user-threads", getUserThreads);
app.get("/api/get-all-threads", getAllThreads);

// mapping endpoints
app.get("/api/map-pins", getPinsOfType);

// admin endpoints
app.patch("/api/modify-pin", modifyPinWithId);

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
