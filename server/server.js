"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const {
  // handlers here
} = require("./handlers");

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

  // ---------------------------------
  // .get("/api/get-flights", getFlights)
  // .get("/api/get-flight", getFlight)
  // .patch("/api/update-availability", updateAvailability)
  // .get("/api/get-reservations", getReservations)
  // .get("/api/get-reservation", getSingleReservation)
  // .post("/api/add-reservation", addReservation)
  // .patch("/api/update-reservation", updateReservation)
  // .delete("/api/delete-reservation", deleteReservation)

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
