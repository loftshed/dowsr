const getUserLocation = async () => {
  try {
    const response = await fetch("http://ip-api.com/json/24.48.0.1");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const handleGetPinsOfType = async (filter) => {
  try {
    const response = await fetch(
      `http://localhost:9001/api/map-pins?filter=${filter}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export { getUserLocation, handleGetPinsOfType };
