// Fetch request that sends username in the query
// example: localhost:9001/api/get-submissions?username=username
// Returns all submissions by the user

const handleGetUserContributions = async (username) => {
  try {
    const response = await fetch(`/api/get-submissions?username=${username}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const handleGetUserPending = async (userId) => {
  try {
    const response = await fetch(`/api/get-pending-review?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Follows or unfollows another user. Requires userId and targetUserId in the query.
// A third parameter "follow" should be included if userId is to follow targetUserId.
// If the optional third parameter "follow" is not included, userId will unfollow targetUserId.
// Uses a fetch request with PATCH method.
// example - to follow:
// /api/toggle-follow?userId=userId&targetUserId=targetUserId&follow=true
// to unfollow:
// /api/toggle-follow?userId=userId&targetUserId=targetUserId

const handleToggleFollow = async (userId, targetUserId, follow) => {
  try {
    const response = await fetch(
      `/api/toggle-follow?userId=${userId}&targetUserId=${targetUserId}${
        follow ? "&follow=true" : ""
      }`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { handleGetUserContributions, handleGetUserPending, handleToggleFollow };
