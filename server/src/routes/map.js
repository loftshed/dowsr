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
app.get("/api/get-submissions", getSubmissionsByUsername); // working
app.get("/api/get-pending-review", getSubmissionsPendingReview); // working
app.get("/api/get-pins", getPinsOfType); // working
app.get("/api/get-pin", getOnePin); // working
app.get("/api/get-pins/all", getAllPins); // working
app.patch("/api/submit-pin", submitNewPin); // working
app.patch("/api/modify-pin", modifyPin); // working
app.patch("/api/moderate-pin", moderatePin); // working
app.patch("/api/delete-pin", deletePin); // working
app.patch("/api/toggle-like", toggleLikePin); // working!!!!!!!!!!!!!!!!!!
