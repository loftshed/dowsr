"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

// we assign the express function to a variable for later use
// this allows us to use the express function without having to
// type out the entire function every time we want to use it
// some options are:
const app = express();

/*---------
| imports |
---------*/
// morgan is a logger. it logs the request and response to the console.
// the argument "tiny" is the format.
app.use(morgan("tiny"));

// express.json() is a middleware that parses incoming requests with JSON payloads.
app.use(express.json());

// specifies the static folder where the frontend files are located to make them accessible.
app.use(express.static("public"));

// helmet is a security package that helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// CORS is a security feature that allows you to restrict access to your API from different domains.
app.use(cors());

/*----------------------------------------
| socket.io stuff i understand even less |
----------------------------------------*/
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});
http.listen(8080, () => console.log("listening on http://localhost:8080"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("postMessage", async ({ post }) => {
    try {
      const returnData = {
        message: "yo",
      };
      io.emit("newMessage", returnData);
    } catch (error) {}
  });
});

// io.on("connection", (socket) => {
//   console.log(socket.handshake.query); // prints { x: "42", EIO: "4", transport: "polling" }
// });

/*--------
| routes |
--------*/
app.use(require("./src/routes/chat"));
app.use(require("./src/routes/map"));
app.use(require("./src/routes/user"));

// if no route is found, return a 404 error.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message:
      "404: PEBCAK error occurred during development. Please contact support.",
  });
});

// sets server to listen with power level over 9000.
app.listen(9001, () => console.log(`Listening on port 9001`));
