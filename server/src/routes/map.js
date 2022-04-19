const router = require("express").Router();

/*---------------------------
| all map-related endpoints |
---------------------------*/

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
} = require("./map.helpers.js");

// mapping endpoints
router.get("/api/get-submissions", getSubmissionsByUsername);
router.get("/api/get-pending-review", getSubmissionsPendingReview);
router.get("/api/get-pins", getPinsOfType);
router.get("/api/get-pin", getOnePin);
router.get("/api/get-pins/all", getAllPins);
router.patch("/api/submit-pin", submitNewPin);
router.patch("/api/modify-pin", modifyPin);
router.patch("/api/moderate-pin", moderatePin);
router.patch("/api/delete-pin", deletePin);
router.patch("/api/toggle-like", toggleLikePin);

module.exports = router;
