const {
  addUser, // Adds a new user to the DB.
  getUser, // Returns a single user.
  modifyUser, // Modifies a user.
  removeUser, // Removes a user from the DB.
  addPinToUserContributions, // Pushes a newly created pin to the creator's contributions array.
  toggleFollowUser, // Toggles one user following/unfollowing another.
} = require("./user.helpers.js");

// user endpoints
app.post("/api/add-user", addUser); // working
app.get("/api/get-user", getUser); // working
app.get("/api/get-user/:username", getUser); // working
app.patch("/api/modify-user", modifyUser); // working
app.patch("/api/:username/add-contribution", addPinToUserContributions); // working
app.delete("/api/remove-user", removeUser); // working
app.patch("/api/toggle-follow", toggleFollowUser);
