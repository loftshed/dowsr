const getUser = async (email) => {
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

const completeSignup = async ({ target }) => {
  console.log(target.firstName.value);
  try {
    const response = await fetch(
      `/api/modify-user?email=${target.email.value}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          givenName: target.firstName.value,
          middleInitial: target.middleName.value,
          familyName: target.lastName.value,
          birthdate: target.birthdate.value,
          gender: target.gender.value,
          city: target.city.value,
          country: target.country.value,
          region: target.region.value,
        }),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { getUser, addUserToDB, completeSignup };
