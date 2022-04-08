const checkUserEmail = async (email) => {
  try {
    const response = await fetch(`/api/get-user?email=${email}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const addUserToDB = async ({
  email,
  family_name,
  given_name,
  nickname,
  picture,
}) => {
  try {
    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        familyName: family_name,
        givenName: given_name,
        username: nickname,
        avatarUrl: picture,
      }),
    });
    console.log(await response.json());
  } catch (error) {
    console.log(error);
  }
};

export { checkUserEmail, addUserToDB };
