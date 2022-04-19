const router = require("express").Router();

/*----------------------------
| all user-related endpoints |
----------------------------*/

const {
  addUser, // Adds a new user to the DB.
  getUser, // Returns a single user.
  modifyUser, // Modifies a user.
  removeUser, // Removes a user from the DB.
  addPinToUserContributions, // Pushes a newly created pin to the creator's contributions array.
  toggleFollowUser, // Toggles one user following/unfollowing another.
} = require("./user.helpers.js");

// user endpoints
router.post("/api/add-user", addUser);
router.get("/api/get-user", getUser);
router.get("/api/get-user/:username", getUser);
router.patch("/api/modify-user", modifyUser);
router.patch("/api/:username/add-contribution", addPinToUserContributions);
router.delete("/api/remove-user", removeUser);
router.patch("/api/toggle-follow", toggleFollowUser);

module.exports = router;
