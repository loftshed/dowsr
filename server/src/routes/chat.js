const router = require("express").Router();

/*----------------------------
| all chat-related endpoints |
----------------------------*/

const {
  getOneThread, // Gets a single thread by its ID.
  newThread, // Creates a new thread between two users if one doesn't already exist.
  modifyThread, // Modifies a thread. This is used to add a message to a thread.
  getUserThreads, // Gets all threads involving a given user by their userId.
  getAllThreads, // Gets every single thread in the DB.
  deleteThreadForUser, // Deletes one user's copy of a thread.
  deleteThreadPermanently, // Deletes a thread from the DB completely.
} = require("./chat.helpers.js");

// messaging endpoints
router.post("/api/new-thread", newThread);
router.patch("/api/modify-thread", modifyThread);
router.get("/api/get-thread", getOneThread);
router.get("/api/get-user-threads", getUserThreads);
router.get("/api/get-all-threads", getAllThreads);
router.patch("/api/delete-thread", deleteThreadForUser);
router.patch("/api/delete-thread-permanently", deleteThreadPermanently);

module.exports = router;
