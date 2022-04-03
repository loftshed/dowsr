"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  // handlers here
} = require("./userHandlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  /*-----------
  | endpoints |
  -----------*/

  /*------------------
  | end of endpoints |
  ------------------*/

  // Catch-all endpoint
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Sets server to listen with port power level over 9000.
  .listen(9001, () => console.log(`Listening on port 9001`));
