"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

/*---------------------------
| stuff i barely understand |
---------------------------*/
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(cors()); // CORS is a security feature that allows you to restrict access to your API from different domains.

/*----------------------------------------
| socket.io stuff i understand even less |
----------------------------------------*/
// const http = require("http").createServer(app);
// const io = require("socket.io")(http, { cors: { origin: "*" } });
// http.listen(8080, () => console.log("listening on http://localhost:8080"));

/*--------
| routes |
--------*/
app.use(require("./src/routes/chat"));
app.use(require("./src/routes/map"));
app.use(require("./src/routes/user"));

app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message:
      "404: PEBCAK error occurred during development. Please contact support.",
  });
});

// Sets server to listen with power level over 9000.
app.listen(9001, () => console.log(`Listening on port 9001`));
