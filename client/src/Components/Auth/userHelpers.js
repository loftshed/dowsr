const getUser = async (email) => {
  try {
    const response = await fetch(`/api/get-user?email=${email}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

//TODO: turn add/modify user into a single function that switches purpose with an argument..
const addNewUser = async ({ target }, user) => {
  try {
    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        givenName: target.firstName.value,
        middleInitial: target.middleName.value,
        familyName: target.lastName.value,
        username: target.username.value,
        birthdate: target.birthdate.value,
        gender: target.gender.value,
        city: target.city.value,
        country: target.country.value,
        region: target.region.value,
        avatarUrl: user.picture,
        contributions: 0,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const modifyUser = async ({ target }) => {
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

export { getUser, addNewUser, modifyUser };
