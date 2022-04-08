"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

/*-----------
| handlers |
-----------*/
const { addUser, getUser } = require("./userHandlers");

app.use(morgan("tiny"));
app.use(express.json()); // this was used in slingair server..  do i need?
app.use(express.static("public")); // requests for static files go to public folder
app.use(helmet());
app.use(cors());

/*-----------
| endpoints |
-----------*/

app.post("/api/add-user", addUser);
app.get("/api/get-user", getUser);

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
