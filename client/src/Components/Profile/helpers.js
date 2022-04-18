// Fetch request that sends username in the query
// example: localhost:9001/api/get-submissions?username=username
// Returns all submissions by the user

const handleGetUserContributions = async (username) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-submissions?username=${username}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { handleGetUserContributions };
